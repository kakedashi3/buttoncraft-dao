import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Background } from "@/components/background";
import { useRouter } from "next/router";
import { NftViewer } from "@/components/nftViewer";
import { RefreshIcon } from "@/components/refreshIcon";
import { Modal } from "@/components/modal";
import { MintSuccess } from "@/components/mintSuccess";
import { BeadSuccess } from "@/components/beadSuccess";
import { BeadLoading } from "@/components/beadLoading";
import { ethers } from "ethers";

import useSWR from "swr";

const Address: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const router = useRouter();
  const { query } = router;
  const { address: queryAddress, beadClaim, minted, beadLoading } = query;

  const addressFromUrl = Array.isArray(queryAddress)
    ? queryAddress[0]
    : queryAddress;

  const formattedAddress = addressFromUrl
    ? ethers.utils.getAddress(addressFromUrl!)
    : undefined;

  const { data, isLoading, mutate } = useSWR(
    addressFromUrl ? `/api/${addressFromUrl}/lizard` : "",
    async (url: string) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (minted === "true") {
      setModalContent(<MintSuccess />);
      setShowModal(true);

      return;
    }
    if (beadClaim === "true") {
      setModalContent(<BeadSuccess />);
      setShowModal(true);

      return;
    }
  }, [minted, beadClaim]);

  return (
    <div>
      <Head>
        <title>Bead DAO</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="relative ">
              <video
                className="object-cover h-[353px] w-[367px]"
                src="/lizzlfying.webm"
                autoPlay
                loop
              />
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="py-3 px-4 text-3xl whitespace-nowrap text-white rounded-full cursor-pointer font-bold">
                  LOADING....
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {addressFromUrl && data && (
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-end items-center w-full p-5">
                  <RefreshIcon handleClick={mutate} />
                </div>
                <NftViewer
                  nft={data}
                  ownedBy={formattedAddress}
                  account={data.account}
                  balance={data.beadCount}
                />
              </div>
            )}
          </div>
        )}
      </Background>
      {showModal && (
        <div>
          <Modal
            onClose={() => {
              setModalContent(null);
              setShowModal(false);
            }}
          >
            {modalContent}
          </Modal>
        </div>
      )}
      {beadLoading === "true" && <BeadLoading />}
    </div>
  );
};

export default Address;
