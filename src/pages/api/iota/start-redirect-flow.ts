import {
  Configuration,
  IotaApi,
  IotaConfigurationDtoModeEnum,
  InitiateDataSharingRequestOKData,
} from "@affinidi-tdk/iota-client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthProvider } from "src/lib/clients/auth-provider";
import { ResponseError } from "src/types/types";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const initShareSchema = z.object({
  configurationId: z.string(),
  queryId: z.string(),
  redirectUri: z.string(),
  nonce: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ResponseError>
) {
  try {
    console.log("trying to print");
    console.log(req.body);
    const { configurationId, queryId, redirectUri, nonce } =
      initShareSchema.parse(req.body);

    const authProvider = getAuthProvider();

    const api = new IotaApi(
      new Configuration({
        apiKey: authProvider.fetchProjectScopedToken.bind(authProvider),
      })
    );

    const { data: dataSharingRequestResponse } =
      await api.initiateDataSharingRequest({
        configurationId,
        mode: IotaConfigurationDtoModeEnum.Redirect,
        queryId,
        correlationId: uuidv4(),
        nonce,
        redirectUri,
      });

    const { correlationId, transactionId, jwt } =
      dataSharingRequestResponse.data as InitiateDataSharingRequestOKData;

    res.status(200).json({ correlationId, transactionId, jwt });

  } catch (error: any) {
    res.status(500).json({ message: "Unable to get Iota credentials" });
    console.log(error);
  }
}
