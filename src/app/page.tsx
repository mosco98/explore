"use client";

import { dub } from "@/lib/dub";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const userId = "hjsgdbj-jhasdbjs-kjhashdbjs";

const HomePage = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shortLink, setShortLink] = useState("");
  const [qrCode, setQrCode] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?invite=${userId}`;

  useEffect(() => {
    const handleCreateInviteLink = async () => {
      const result = await dub.links.create({
        title: "Welcome to the family, Doc!",
        description:
          "Join 1,500+ healthcare providers on our waitlist. We'll notify you when it's time to onboard.",
        url: inviteLink,
        tenantId: userId
        // trackConversion: true
      });
      setShortLink(result.shortLink);
      setQrCode(result.qrCode);
      setLoading(false);
    };
    handleCreateInviteLink();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-dvh grid place-items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen grid place-items-center">
        <div className="w-[420px] rounded-3xl overflow-hidden text-center">
          <div className="bg-white pt-10 pb-16 px-8">
            <div>
              <Image
                src={"/doctors.png"}
                width={156}
                height={56}
                alt="doctors"
                className="mx-auto"
              />
            </div>

            <div className="space-y-3 my-6">
              <h3 className="text-2xl font-medium">
                Welcome to the family, Doc!
              </h3>
              <p className="text-[#64748B] text-sm -tracking-[0.28px]">
                You&apos;ve joined 1,500+ healthcare providers on our waitlist.
                We&apos;ll notify you when it&apos;s time to onboard.
              </p>
            </div>

            <button className="h-10 py-2 px-4 rounded-[999px] border flex items-center justify-center gap-2 mx-auto text-sm font-medium border-white/30 shadow-primary-normal bg-button text-white btn-main hover:opacity-90 transition">
              Continue <ArrowRight className="size-4" />
            </button>
          </div>

          <p className="py-2 text-[#64748B] font-medium text-sm">
            INVITE YOUR PEERS!
          </p>

          <div className="pt-6 pb-10 px-8 bg-white space-y-4">
            <p className="max-w-[356px] mx-auto text-[#020617] -tracking-[0.32px]">
              Share your unique invitation link and help us build the future of
              healthcare, together.
            </p>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-10 border border-[#E4E4E7] rounded-lg px-3 py-2 md:text-sm overflow-hidden">
                <p className="line-clamp-1 text-[#71717A] text-left">
                  {/* https://app.neo.health/carefund/campaigns/neo-rising-warriors-grant */}
                  {inviteLink}
                </p>
              </div>

              <button
                className={cn(
                  "size-10 rounded-full shadow-outline-normal flex items-center justify-center flex-shrink-0 hover:bg-[#E4E4E7] transition",
                  isCopied &&
                    "bg-green-500 shadow-none hover:bg-green-500 text-white pointer-events-none"
                )}
                onClick={() => !isCopied && handleCopy()}
              >
                {!isCopied ? (
                  <Copy className="size-4" />
                ) : (
                  <Check className="size-4" />
                )}
              </button>
            </div>

            <div>
              <button
                className="text-sm underline"
                onClick={() => setOpenDialog(true)}
              >
                Share QR Code
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openDialog && (
          <div className="h-screen w-screen fixed top-0 left-0 z-[9999] grid place-items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpenDialog(false)}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute pointer-events-none"
            >
              <Image
                className="rounded-2xl w-[300px] h-[300px]"
                src={qrCode}
                width={300}
                height={300}
                alt=""
                priority
                sizes="300px"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;
