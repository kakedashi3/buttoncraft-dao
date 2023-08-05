'use client'

import type { NextPage } from 'next'
import Head from 'next/head'
import { Background } from '../components/background'
import { Button } from '../components/button'
import { AquaButton } from '@/components/AquaButton'
import { ethers } from 'ethers'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { useAccount, usePublicClient, useNetwork, Chain } from 'wagmi'
import { toast, Toaster } from 'react-hot-toast'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getPublicKeysFromScan, getSignatureFromScan } from 'pbt-chip-client/kong'
import parseKeys from '@/utils/parseKeys'
import Image from 'next/image'

import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

import { hashMessage, keccak256, encodePacked, hexToBigInt } from 'viem'

import { useConnectModal } from '@rainbow-me/rainbowkit'

import { useBeadMint, beadAddress } from '@/generated'

import { Text, Input } from '@/components'

function conditionalKey(key: string, dependencies: any[]) {
  for (const dependency of dependencies) {
    if (!dependency) return null
  }

  return key
}

const Scan: NextPage = () => {
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const keysStatic = searchParams.get('static')

  const { address, isConnected, isConnecting } = useAccount()
  const { openConnectModal } = useConnectModal()

  const { chain } = useNetwork()

  const currentChain = chain?.id || 11155111

  const publicClient = usePublicClient({
    chainId: currentChain,
  })

  // @ts-ignore
  const tokenContract = beadAddress[currentChain]

  const { data: txData, isLoading: mintLoading, isSuccess, write } = useBeadMint()

  const { data: blockData } = useSWR(
    conditionalKey(`/${address}/blockData`, [address]),
    async () => {
      if (!address) {
        throw Error('Dependencies not met')
      }
      const { hash, number: blockNumber } = await publicClient.getBlock()
      // const hash = '0xaef75ccfbb6cb1d509c2e7cfc0e806413c61ad584d35d74b88e54a69207c64f9'
      // const blockNumber = 4026266n

      console.log(hash, blockNumber)

      if (!hash || !blockNumber) {
        throw Error('Error fetching block information')
      }

      const localMessageHash = hashMessage({
        raw: keccak256(encodePacked(['address', 'bytes32'], [address, hash])),
      })

      const tokenId = hexToBigInt(localMessageHash)

      const beadId = (tokenId % 1260n) + 1n

      const image = `https://cloudflare-ipfs.com/ipfs/bafybeiemt555y6bsgkree3ee4o4v52wgvk275hb2ml5mvv4r24viq74vpq/${beadId}.png`

      console.log(image)

      return {
        hash,
        blockNumber,
        tokenId,
        beadId,
        image,
      }
    }
  )

  const {
    trigger: triggerScan,
    data: mintData,
    isMutating: scanLoading,
  } = useSWRMutation(
    conditionalKey(`/${address}/scanData`, [address, blockData]),
    async () => {
      if (!address || !blockData) {
        throw Error('Dependencies not met')
      }

      let keys: any = parseKeys(keysStatic)
      if (!keys) {
        keys = await getPublicKeysFromScan()
      }

      const primaryKey = keys?.primaryPublicKeyRaw

      if (!primaryKey) {
        throw Error('Could not fetch lizard key')
      }

      const keyAddress = ethers.utils.computeAddress(`0x${primaryKey}`)

      const lizardTree = await fetch('/lizardTree-v2.json').then((res) => res.json())

      const tree = StandardMerkleTree.load(lizardTree)

      const proof = tree.getProof([keyAddress])

      if (!tree.verify([keyAddress], proof)) {
        throw Error('Not a lizard')
      }

      console.log(blockData.tokenId, blockData.beadId)

      const signature = await getSignatureFromScan({
        chipPublicKey: keys.primaryPublicKeyRaw,
        address: address!,
        hash: blockData.hash,
      })

      // const signature =
      //   '0x27d46cb5907772c5b8a8bba4f5b966798fee667c5d4bf75aece261ef84d029f670ff1b3d356ae18df2b5dda03c32bf770590bd85caa3c65778202b6877e237a21c'

      console.log(signature)

      if (!signature) {
        throw Error('No signature returned')
      }

      return {
        signature,
        proof,
      }
    }
  )

  return (
    <div className="font-[Inter]">
      <Head>
        <title>Bead DAO</title>
        <meta name="description" content="Generated by @rainbow-me/create-rainbowkit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background>
        {isConnecting && <Text>LOADING...</Text>}

        {keysStatic && !isConnecting && !isConnected && (
          <AquaButton onClick={() => openConnectModal?.()} className="py-4">
            <Text variant={'paragraph-lg'} isInline>
              Connect Wallet
            </Text>
          </AquaButton>
        )}

        {keysStatic && !isConnecting && isConnected && !mintLoading && (
          <div className="p-4 w-full">
            <div className="bg-white bg-opacity-40 backdrop-blur-3xl rounded-lg w-full flex flex-col justify-center items-center p-6">
              {blockData && (
                <img
                  src={blockData.image}
                  className="h-full w-full rounded aspect-square mb-6"
                />
              )}
              {!mintData && (
                <AquaButton onClick={() => triggerScan()} className="py-4">
                  <Text variant={'paragraph-lg'} isInline>
                    Verify Lizard
                  </Text>
                </AquaButton>
              )}
              {!txData && mintData && blockData && address && (
                <>
                  <div className="mb-4 w-full">
                    <Input
                      name="message"
                      label="Mint a message with your bead"
                      placeholder="Type your message here"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <AquaButton
                    onClick={() =>
                      write({
                        args: [
                          blockData.blockNumber,
                          mintData.signature as `0x${string}`,
                          mintData.proof as `0x${string}`[],
                          address,
                          message,
                        ],
                      })
                    }
                    className="py-4"
                  >
                    <Text variant={'paragraph-lg'} isInline>
                      Mint Bead
                    </Text>
                  </AquaButton>
                </>
              )}
              {txData && blockData && isSuccess && (
                <div className="flex flex-col justify-center items-center">
                  <Text variant={'heading-md'} isInline className="text-center mb-4">
                    You minted a BEAD!
                  </Text>
                  <a
                    href={`https://testnets.opensea.io/assets/sepolia/${tokenContract}/${blockData.tokenId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AquaButton className="py-4">
                      <Text variant={'paragraph-lg'} isInline>
                        View on Opensea
                      </Text>
                    </AquaButton>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {!keysStatic && (
          <div className="absolute inset-0 flex flex-col items-center justify-start bg-black bg-opacity-30">
            <div className="w-64 h-64 mt-4 mb-4 overflow-hidden bg-white rounded-lg shadow">
              <Image
                className="w-64 h-64 mb-4"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGY3ZGRmNTU1YjAxNjM2ODQzY2Y2MzU4YmZhMjEwOGFlYzNhZTE3NCZjdD1z/QtX9VvsqoJ9nNpRVGF/giphy.gif"
                alt="processing gif"
                width={64}
                height={64}
              />
            </div>
            <div className="px-4 py-2 bg-white rounded-md">
              <Text variant={'paragraph-lg'} className="font-bold">
                Tap a lizard chip to mint beadz
              </Text>
            </div>
          </div>
        )}

        {scanLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-start bg-black bg-opacity-30">
            <div className="w-64 h-64 mt-4 mb-4 overflow-hidden bg-white rounded-lg shadow">
              <Image
                className="w-64 h-64 mb-4"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGY3ZGRmNTU1YjAxNjM2ODQzY2Y2MzU4YmZhMjEwOGFlYzNhZTE3NCZjdD1z/QtX9VvsqoJ9nNpRVGF/giphy.gif"
                alt="processing gif"
                width={64}
                height={64}
              />
            </div>
            <div className="px-4 py-2 bg-white rounded-md">
              <Text variant={'paragraph-lg'} className="font-bold">
                Tap the chip again to verify
              </Text>
            </div>
          </div>
        )}

        {mintLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-20">
            <div className="w-64 h-64 mt-8 mb-4 overflow-hidden bg-white rounded-lg shadow">
              <Image
                className="w-64 h-64 mb-4"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZkNWIxZDMxNTM0MTBmNGU2NTU4NzhjYTE4ZDhiMDg2NTk2MTAzZSZjdD1z/yYmPdb7UNlih5LlpL8/giphy.gif"
                width={64}
                height={64}
                alt="loading image"
              />
            </div>
          </div>
        )}

        <Toaster position="bottom-center" />
      </Background>
    </div>
  )
}

export default Scan
