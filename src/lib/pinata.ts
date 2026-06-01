import { PinataSDK } from "pinata";

function getPinata() {
  const pinataJwt = process.env.PINATA_JWT;
  const pinataGateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY;
  if (!pinataJwt || !pinataGateway) {
    return null;
  }
  return new PinataSDK({ pinataJwt, pinataGateway });
}

export async function uploadToPinata(file: File) {
  const pinata = getPinata();
  if (!pinata) {
    throw new Error("Pinata is not configured");
  }
  const { cid } = await pinata.upload.public.file(file);
  const url = await pinata.gateways.public.convert(cid);
  return { cid, url };
}
