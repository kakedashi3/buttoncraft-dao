'use client'
import { useAccount } from 'wagmi'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useMemo, ReactNode, useEffect } from 'react'
import { Background } from '@/components/background'
import { NavLink } from '@/components/navLink'
import Link from 'next/link'
import { Modal } from '@/components/modal'
import { How } from '@/components/how'
import infoIcon from 'public/icons/infoDock-icon.png'
import twitterIcon from 'public/icons/twitter-icon.png'
import telegramIcon from 'public/icons/telegram-icon.png'
import igIcon from 'public/icons/ig-fx-icon.png'
import tapImage from 'public/tap-chip.jpg'
import icon1 from 'public/icon-1.png'
import icon2 from 'public/icon-2.png'
import { Button } from './components/button'
import { Text } from '@/components/'

import { AquaButton } from './components/AquaButton'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'November',
  'December',
]

const getDateTime = () => {
  const date = new Date()
  return {
    weekday: days[date.getDay()],
    month: months[date.getMonth()],
    date: date.getDate(),
    time: date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0'),
  }
}

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)
  const links = useMemo(
    () => [
      {
        type: 'item',
        link: '/scan',
        text: 'Tap Chip n Mint ButtonCraft',
        description: 'Find someone with a Lizard Halo Chip to mint a ButtonCraft!',
        external: false,
        detailed: true,
        image: tapImage,
      },
      {
        type: 'separator',
        link: '',
        text: '---',
        external: false,
        detailed: false,
      },
      // {
      //   type: 'item',
      //   link: 'https://www.instagram.com/ar/1251248262474299/',
      //   text: 'Get BEADED',
      //   description: 'Try the ILOVEBEADZ IG filter ✨',
      //   external: true,
      //   image: icon1,
      // },
      // {
      //   type: 'item',
      //   link: '/gallery',
      //   text: 'View the BeadDAO Gallery',
      //   description: 'See who else loves beadz IRL',
      //   modal: false,
      //   image: icon2,
      //   external: false,
      // },
    ],
    []
  )
  const { weekday, month, date, time } = getDateTime()
  return (
    <div className="">
      <Head>
        <title>ButtonCraft DAO</title>
        <meta name="description" content="Generated by @rainbow-me/create-rainbowkit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background>
        <div className="min-h-full pt-[3.5rem] pb-[1rem] ml-2 mr-2 flex flex-col  items-center">
          <div className="flex flex-col items-center">
            <div className="text-xl text-white font-joker">
              {weekday}, {month} {date}
            </div>
            <div className="text-white font-display font-semibold text-[5rem]">
              {time}
            </div>
          </div>
          <div className="flex-1 [&>*]:my-2">
            {links
              // will bring all `detailed` items on top
              .sort((a, b) => Number(b.detailed) - Number(a.detailed))
              .map((item, i) => {
                if (item.type === 'separator') {
                  return (
                    <Text
                      variant="heading-sm"
                      className="text-white place-self-start first-letter:capitalize"
                      key={i}
                    >
                      
                    </Text>
                    // <div
                    //   className="text-lg text-white place-self-start font-display first-letter:capitalize"

                    // >
                    //   Beadification Center
                    // </div>
                  )
                }

                return (
                  <div key={i}>
                    <LinkWrapper isExternal={item.external || false} href={item.link}>
                      <NavLink
                        key={item.link}
                        className="cursor-pointer"
                        detailed={item.detailed || false}
                      >
                        <div className="flex flex-row items-center gap-3 text-xs">
                          {item.detailed ? (
                            <Image
                              className="min-w-[102px] min-h-[111px] max-w-[102px] max-h-[111px] rounded-lg"
                              width={102}
                              height={111}
                              alt="tap image help"
                              src={item.image || ''}
                            />
                          ) : (
                            <Image
                              className="min-w-[38px] min-h-[38px] max-w-[38px] max-h-[38px] rounded-lg"
                              width={38}
                              height={38}
                              alt="icon image"
                              src={item.image || ''}
                            />
                          )}
                          <div className="flex flex-col flex-1 gap-1">
                            <Text
                              variant="heading-xs"
                              className=" first-letter:capitalize"
                            >
                              {item.text}
                            </Text>

                            <Text variant="paragraph-xs" className="text-slate-500">
                              {item.description}
                            </Text>
                            {item.detailed && (
                              <>
                                <AquaButton className="max-w-[200px]">
                                  Mint a ButtonCraft NFT
                                </AquaButton>
                              </>
                            )}
                          </div>
                          {item.detailed ? (
                            <></>
                          ) : (
                            <Text
                              variant="paragraph-xs"
                              className="left-0 self-start text-slate-500"
                            >
                              now
                            </Text>
                          )}
                        </div>
                      </NavLink>
                    </LinkWrapper>
                  </div>
                )
              })}
          </div>
          <div className="flex justify-center items-center space-x-4 rounded-[41px] bg-link backdrop-blur-sm w-full py-4 place-self-end">
            <div
              className="cursor-pointer"
              onClick={() => {
                setModalContent(<How />)
                setShowModal(true)
              }}
            >
              <Image src={infoIcon} width={60} height={60} alt="info dock icon" />
            </div>
            <a
              className="cursor-pointer"
              href="https://t.me/beaddao"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={telegramIcon} width={60} height={60} alt="info dock icon" />
            </a>
            <a
              className="cursor-pointer"
              href="https://twitter.com/ilovebeadz"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={twitterIcon} width={60} height={60} alt="twitter dock icon" />
            </a>
            <a
              className="cursor-pointer"
              href="https://www.instagram.com/ar/1251248262474299/"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={igIcon} width={60} height={60} alt="instagram dock icon" />
            </a>
          </div>
        </div>
      </Background>
      {showModal && (
        <Modal
          title={'How to Mint'}
          onClose={() => {
            setModalContent(null)
            setShowModal(false)
          }}
        >
          {modalContent}
        </Modal>
      )}
    </div>
  )
}

const LinkWrapper = ({
  children,
  isExternal,
  href,
}: {
  children: ReactNode
  isExternal: boolean
  href: string
}) => {
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return <Link href={href}>{children}</Link>
}

export default Home

// declare global {
//   interface Window {
//     ethereum?: WindowProvider
//   }
// }
//
// export default function FPHome() {
//   return (
//     <main className={clsx('flex flex-col gap-5 flex-1 justify-center items-center')}>
//       <div className={clsx('flex flex-col justify-center items-center')}>
//         <span className="text-xl font-bold font-display">MAIN</span>
//         <span className="font-primary">DISPLAY FONT</span>
//         <span className="font-mono">MONO FONT</span>
//         <span className="font-code">CODE FONT</span>
//       </div>
//       <TBAccount />
//
//       <ExampleAlchemyFetch />
//     </main>
//   )
// }
