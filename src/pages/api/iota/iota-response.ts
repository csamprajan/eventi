import type { NextApiRequest, NextApiResponse } from "next";
import {
  Configuration,
  IotaApi,
  FetchIOTAVPResponseOK,
} from "@affinidi-tdk/iota-client";
import { getAuthProvider } from "src/lib/clients/auth-provider";
import { ResponseError } from "src/types/types";
import { z } from "zod";

const responseSchema = z.object({
  configurationId: z.string(),
  correlationId: z.string(),
  transactionId: z.string(),
  responseCode: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ResponseError>
) {
  if (req.method === "OPTIONS") {
    res.status(200).json({ message: "CORS preflight successful" });
  } else {
  try {
    const { responseCode, configurationId, correlationId, transactionId } =
      responseSchema.parse(req.body);

    const authProvider = getAuthProvider();

    const api = new IotaApi(
      new Configuration({
        apiKey: authProvider.fetchProjectScopedToken.bind(authProvider),
      })
    );
    const iotaVpResponse: FetchIOTAVPResponseOK = await api.fetchIotaVpResponse({
      configurationId,
      correlationId,
      transactionId,
      responseCode,
    });

    const vp = JSON.parse((iotaVpResponse.data as any).vpToken);

    res.status(200).json({ vp: vp, nonce: iotaVpResponse.data.nonce });

  } catch (error: any) {
    console.log(error);
    const statusCode = error?.httpStatusCode || error.statusCode || 500;
    res
      .status(statusCode)
      .json({ message: error.message, details: error?.details });
  }
}
}
