import { useState, useEffect } from "react";
import * as S from "./index.styled";
import { hostUrl, iotaConfigId, eventTicketQuery } from "src/lib/variables";
import useIotaQuery from "src/lib/hooks/useIotaQuery";
import useIotaQueryRedirect from "src/lib/hooks/useIotaQueryRedirect";
import { OpenMode } from "@affinidi-tdk/iota-browser";

const eventData = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  type: ["VerifiablePresentation"],
  verifiableCredential: [
    {
      credentialSchema: {
        type: "EventTicketVC",
        id: "https://schema.affinidi.io/TEventTicketVCV1R0.json",
      },
      credentialSubject: {
        createdAt: "2024-09-29T08:57:11.156Z",
        attendeeAtrributes: {
          firstName: "Paramesh",
          lastName: "Kamarthi",
          dateOfBirth: "1983-08-24",
          email: "paramesh.k@affinidi.com",
        },
        secrete: "2024-09-29T08:57:11.156Z",
        event: {
          name: "Brewnanza Fest Singapore Craft Beer Festival",
          eventId: "1",
          location: "Singapore",
          endDate: "2024-08-28T22:00:00.000Z",
          startDate: "2024-08-24T18:00:00.000Z",
        },
        ticket: {
          seat: "General Adminsion",
          ticketId: "1",
          ticketType: "Brewnanza Fest Singapore Craft Beer Festival",
        },
      },
      issuanceDate: "2024-09-26T08:57:24.660Z",
      holder: {
        id: "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i",
      },
      id: "claimId:c4879e2073393a57",
      type: ["VerifiableCredential", "EventTicketVC"],
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://schema.affinidi.io/TEventTicketVCV1R0.jsonld",
      ],
      issuer: "did:key:zQ3shYvNUXfUSGvgh7fTy2mExxMbBUJfNZLGTZVnD1heP22Cp",
      proof: {
        type: "EcdsaSecp256k1Signature2019",
        created: "2024-09-26T09:00:15Z",
        verificationMethod:
          "did:key:zQ3shYvNUXfUSGvgh7fTy2mExxMbBUJfNZLGTZVnD1heP22Cp#zQ3shYvNUXfUSGvgh7fTy2mExxMbBUJfNZLGTZVnD1heP22Cp",
        proofPurpose: "assertionMethod",
        jws: "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..n0sZFR95HHtfy6Qv2rJlzESMt12xG2d8OHq63TDWZIsfC7A_WrVfAomoB0Qh1M-GdMN-dMXEPBxq7e8DxJGCWQ",
      },
    },
  ],
  holder: {
    id: "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i",
  },
  id: "claimId:w1nvb0vvBYShfWs_u7wi1",
  proof: {
    type: "EcdsaSecp256k1Signature2019",
    created: "2024-10-08T04:39:34Z",
    verificationMethod:
      "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i#zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i",
    proofPurpose: "authentication",
    challenge: "2ed906d6-c",
    domain: "did:key:zQ3shPmE89kXgS2knjtjDyczrFvd8y7gZVsQe7cYcWobh4QfG",
    jws: "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..QuR0yTwyVkP3TMUDc4RZnwK-tth-A7Ap721m2R-nNARMCEglzGwncWl_Ob_ZSzOoTtE7NUFEF67XmVo0kMFsXw",
  },
};
const Verification = () => {
  const [eventTicketData, setEventTicketData] = useState();
  
  //Hardcoded data
  const [isInitializing, setIsInitializing] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [iotaRequestData, setIotaRequestData] = useState(eventData);
  const [dataRequest, setDataRequest] = useState({ response: { verifiablePresentation: eventData } });

  // const {
  //   isInitializing,
  //   handleInitiate,
  //   errorMessage,
  //   dataRequest,
  //   data: iotaRequestData,
  // } = useIotaQuery({ configurationId: iotaConfigId, openMode: OpenMode.Popup });

  // let {
  //   isInitializing,
  //   handleInitiate,
  //   errorMessage,
  //   dataRequest,
  //   data: iotaRequestData,
  // } = useIotaQueryRedirect({
  //   configurationId: iotaConfigId,
  // });

  useEffect(() => {
    if (!iotaRequestData) return;
    //data for event ticket query
    const eventTicketData =
      iotaRequestData[eventTicketQuery] || iotaRequestData;
    if (eventTicketData) {
      setEventTicketData(eventTicketData);
    }
  }, [iotaRequestData]);

  const handleShareTicket = () => {
    //handleInitiate(eventTicketQuery);
  };

  return (
    <>
    <S.Wrapper>
      <S.TickerooTitle>🎟️ Tickeroo</S.TickerooTitle>
      <S.TickerooSubtitle>Ticket Verification Service</S.TickerooSubtitle>
      <S.Wrapper>
        {isInitializing && <>Loading....</>}
        {errorMessage && <>{errorMessage}</>}
      </S.Wrapper>
    </S.Wrapper>
    <S.BodyWrapper>
      {!eventTicketData && (
        <>
          <S.VerifyButton onClick={() => handleShareTicket()}>Start Ticket Verification</S.VerifyButton>
          {/* <button
            onClick={() => handleShareTicket()}
            className={`rounded text-white py-1  w-1/3`}
            style={{ backgroundColor: "#1F276F" }}
          >
            Click to Share Ticket Credential
          </button> */}
        </>
      )}
      {eventTicketData && (
        <>
          {/* <S.Wrapper>
            Ticket is valid, Congrats!
            <button
              onClick={() => setEventTicketData(undefined)}
              className={`bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-black text-sm`}
            >
              Reset
            </button>
          </S.Wrapper> */}

          <S.TicketWrapper>
            <S.Ticket>
              <S.TicketInfo>
                <S.TicketDate>{new Date(dataRequest?.response?.verifiablePresentation?.verifiableCredential[0].credentialSubject?.event?.startDate).toISOString().split('T')[0]}</S.TicketDate>
                <S.TicketTitle>{dataRequest?.response?.verifiablePresentation?.verifiableCredential[0].credentialSubject?.event?.name}</S.TicketTitle>
                <hr />
                <S.AttendeeName>{dataRequest?.response?.verifiablePresentation?.verifiableCredential[0].credentialSubject?.attendeeAtrributes?.firstName} {dataRequest?.response?.verifiablePresentation?.verifiableCredential[0].credentialSubject?.attendeeAtrributes?.lastName}</S.AttendeeName>
                <S.TicketData>1 x {dataRequest?.response?.verifiablePresentation?.verifiableCredential[0].credentialSubject?.ticket?.seat}</S.TicketData>
              </S.TicketInfo>
              <S.TicketStatus>
                ✅ Verified
              </S.TicketStatus>
            </S.Ticket>
            <S.TicketRaw>
              {JSON.stringify(
                dataRequest?.response?.verifiablePresentation,
                null,
                2
              )}
            </S.TicketRaw>
          </S.TicketWrapper>
          <S.ResetButton onClick={() => setEventTicketData(undefined)}>Reset</S.ResetButton>
          {/* <div style={{ width: "50%", margin: "auto", marginTop: "1rem" }}>
            Below is your Ticket Details
            <pre>
              {JSON.stringify(
                dataRequest?.response?.verifiablePresentation,
                null,
                2
              )}
            </pre>
          </div> */}
          
        </>
      )}
    </S.BodyWrapper>
    </>
  );
};
export default Verification;
