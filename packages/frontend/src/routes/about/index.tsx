import { createFileRoute } from "@tanstack/react-router";
import Marquee from "react-fast-marquee";

export const Route = createFileRoute("/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <div>
        <header className="border-b-2 bg-primary-500 flex flex-col justify-center">
          <Marquee>
            <img src="/assets/about/barcode.svg" width={1024} height={32} />
          </Marquee>
          <div className="py-10 space-y-10">
            <h1 className="text-4xl font-bold text-center table w-full table-fixed">
              <span className="table-row">
                <span className="table-cell text-right pr-6">Your</span>
                <span className="table-cell text-left pl-4">Text.</span>
              </span>
              <span className="table-row">
                <span className="table-cell text-right pr-6">Your</span>
                <span className="table-cell text-left pl-4">Terms.</span>
              </span>
              <span className="table-row">
                <span className="table-cell text-right pr-6">No</span>
                <span className="table-cell text-left pl-4">Gods.</span>
              </span>
            </h1>
            <p className="text-center font-bold">
              Welcome to the Dismantled Market
            </p>
          </div>

          <Marquee className="translate-y-px">
            <img src="/assets/about/barcode.svg" width={1024} height={32} />
          </Marquee>
        </header>

        <article className="p-4 space-y-4 border-b-2">
          <h2 className="text-3xl font-bold">&gt; Hexis</h2>
          <p>
            Hexis is a simple decentralized tool for direct text sales. You sell
            your texts publicly, controlling who accesses them. It's a new
            philosophy for independent publishing, distribution, making any idea
            a business.
          </p>
        </article>
        <article>
          <h2 className="text-3xl font-bold p-4 tracking-tight">
            &gt; How Hexis Works
          </h2>
          <div className="p-8 flex items-center justify-center border-b-2 border-dashed border-gray-100 h-64">
            <p className="text-xl font-bold">
              DEFINE:
              <br /> <u>Pv</u> = PREVIEW TEXT
              <br /> <u>Ts</u> = TEXT FOR SALE
              <br /> <u>Pr</u> = PRICE OF <u>Ts</u> (ETH)
            </p>
          </div>
          <div className="p-8 flex items-center justify-center border-b-2 border-dashed border-gray-100 h-64">
            <p className="text-xl font-bold">
              UPLOAD <u>Ts</u> → GET <u>UUID</u>
            </p>
          </div>
          <div className="p-8 flex items-center justify-center border-b-2 border-dashed border-gray-100 h-64">
            <p className="text-xl font-bold">
              DEPLOY <u>CONTRACT</u>:
              <br />
              WITH <u>UUID + Pr + Pv</u>
              <br />
              IN{" "}
              <span className="text-3xl space-x-1 inline-flex items-center gap-2">
                ETHEREUM{" "}
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-1"
                >
                  <path
                    d="M5.99975 15.1576V20L0.5 11.4141L5.99975 15.1576Z"
                    fill="#18ABD3"
                  />
                  <path
                    d="M11.5 11.4141L5.99976 20V15.1576L11.5 11.4141Z"
                    fill="#6B7ABA"
                  />
                  <path
                    d="M11.5 10.2041L5.99976 6.8645V13.9482L11.5 10.2041Z"
                    fill="#A566A6"
                  />
                  <path
                    d="M11.5 10.2042L5.99976 0V6.86407L11.5 10.2042Z"
                    fill="#F08A78"
                  />
                  <path
                    d="M5.99975 0V6.86407L0.5 10.2047L5.99975 0Z"
                    fill="#FFEB5C"
                  />
                  <path
                    d="M5.99975 6.86401V13.9482L0.5 10.2042L5.99975 6.86401Z"
                    fill="#58B36F"
                  />
                </svg>
              </span>
            </p>
          </div>
          <div className="px-1 py-8 flex items-center justify-center border-b-2 border-dashed border-gray-100">
            <div className="px-3 py-4 border-2 max-w-[290px] bg-primary-500 flex flex-col gap-3">
              <p className="text-2xl font-bold min-h-12 leading-6">
                PREVIEW TEXT (<u>Ts</u>)
                <br />
                e.g. MY MEAL RECIPE
              </p>
              <div className="flex items-center justify-between gap-4">
                <div className="bg-white px-1 py-2 h-24 flex flex-col items-center justify-center gap-0 flex-grow">
                  <p className="text-4xl font-bold">
                    Ξ<u>Pr</u>
                  </p>
                  <p className="text-base font-bold">$USD PRICE</p>
                </div>
                <div>
                  <svg
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_55_713)">
                      <path
                        d="M65.44 65.44H68V68H65.44V65.44ZM57.76 65.44H60.32V68H57.76V65.44ZM50.08 65.44H52.64V68H50.08V65.44ZM44.96 65.44H47.52V68H44.96V65.44ZM37.28 65.44H39.84V68H37.28V65.44ZM29.6 65.44H34.72V68H29.6V65.44ZM4 65.44H21.92V68H4V65.44ZM65.44 62.88H68V65.44H65.44V62.88ZM52.64 62.88H57.76V65.44H52.64V62.88ZM39.84 62.88H47.52V65.44H39.84V62.88ZM24.48 62.88H27.04V65.44H24.48V62.88ZM19.36 62.88H21.92V65.44H19.36V62.88ZM4 62.88H6.56V65.44H4V62.88ZM65.44 60.32H68V62.88H65.44V60.32ZM57.76 60.32H62.88V62.88H57.76V60.32ZM32.16 60.32H44.96V62.88H32.16V60.32ZM19.36 60.32H21.92V62.88H19.36V60.32ZM9.12 60.32H16.8V62.88H9.12V60.32ZM4 60.32H6.56V62.88H4V60.32ZM62.88 57.76H68V60.32H62.88V57.76ZM47.52 57.76H52.64V60.32H47.52V57.76ZM42.4 57.76H44.96V60.32H42.4V57.76ZM19.36 57.76H21.92V60.32H19.36V57.76ZM9.12 57.76H16.8V60.32H9.12V57.76ZM4 57.76H6.56V60.32H4V57.76ZM65.44 55.2H68V57.76H65.44V55.2ZM60.32 55.2H62.88V57.76H60.32V55.2ZM39.84 55.2H57.76V57.76H39.84V55.2ZM32.16 55.2H34.72V57.76H32.16V55.2ZM27.04 55.2H29.6V57.76H27.04V55.2ZM19.36 55.2H21.92V57.76H19.36V55.2ZM9.12 55.2H16.8V57.76H9.12V55.2ZM4 55.2H6.56V57.76H4V55.2ZM55.2 52.64H57.76V55.2H55.2V52.64ZM44.96 52.64H47.52V55.2H44.96V52.64ZM37.28 52.64H39.84V55.2H37.28V52.64ZM32.16 52.64H34.72V55.2H32.16V52.64ZM27.04 52.64H29.6V55.2H27.04V52.64ZM19.36 52.64H21.92V55.2H19.36V52.64ZM4 52.64H6.56V55.2H4V52.64ZM65.44 50.08H68V52.64H65.44V50.08ZM55.2 50.08H57.76V52.64H55.2V50.08ZM50.08 50.08H52.64V52.64H50.08V50.08ZM44.96 50.08H47.52V52.64H44.96V50.08ZM32.16 50.08H34.72V52.64H32.16V50.08ZM24.48 50.08H29.6V52.64H24.48V50.08ZM4 50.08H21.92V52.64H4V50.08ZM55.2 47.52H57.76V50.08H55.2V47.52ZM44.96 47.52H47.52V50.08H44.96V47.52ZM39.84 47.52H42.4V50.08H39.84V47.52ZM34.72 47.52H37.28V50.08H34.72V47.52ZM24.48 47.52H29.6V50.08H24.48V47.52ZM60.32 44.96H62.88V47.52H60.32V44.96ZM44.96 44.96H57.76V47.52H44.96V44.96ZM37.28 44.96H39.84V47.52H37.28V44.96ZM29.6 44.96H34.72V47.52H29.6V44.96ZM11.68 44.96H27.04V47.52H11.68V44.96ZM4 44.96H6.56V47.52H4V44.96ZM65.44 42.4H68V44.96H65.44V42.4ZM57.76 42.4H62.88V44.96H57.76V42.4ZM50.08 42.4H55.2V44.96H50.08V42.4ZM42.4 42.4H44.96V44.96H42.4V42.4ZM37.28 42.4H39.84V44.96H37.28V42.4ZM24.48 42.4H34.72V44.96H24.48V42.4ZM16.8 42.4H19.36V44.96H16.8V42.4ZM9.12 42.4H11.68V44.96H9.12V42.4ZM4 42.4H6.56V44.96H4V42.4ZM62.88 39.84H68V42.4H62.88V39.84ZM52.64 39.84H60.32V42.4H52.64V39.84ZM32.16 39.84H44.96V42.4H32.16V39.84ZM27.04 39.84H29.6V42.4H27.04V39.84ZM19.36 39.84H21.92V42.4H19.36V39.84ZM4 39.84H6.56V42.4H4V39.84ZM62.88 37.28H65.44V39.84H62.88V37.28ZM52.64 37.28H55.2V39.84H52.64V37.28ZM32.16 37.28H50.08V39.84H32.16V37.28ZM24.48 37.28H27.04V39.84H24.48V37.28ZM14.24 37.28H19.36V39.84H14.24V37.28ZM4 37.28H9.12V39.84H4V37.28ZM65.44 34.72H68V37.28H65.44V34.72ZM50.08 34.72H55.2V37.28H50.08V34.72ZM44.96 34.72H47.52V37.28H44.96V34.72ZM37.28 34.72H42.4V37.28H37.28V34.72ZM32.16 34.72H34.72V37.28H32.16V34.72ZM19.36 34.72H29.6V37.28H19.36V34.72ZM11.68 34.72H16.8V37.28H11.68V34.72ZM65.44 32.16H68V34.72H65.44V32.16ZM55.2 32.16H60.32V34.72H55.2V32.16ZM44.96 32.16H52.64V34.72H44.96V32.16ZM39.84 32.16H42.4V34.72H39.84V32.16ZM29.6 32.16H32.16V34.72H29.6V32.16ZM21.92 32.16H27.04V34.72H21.92V32.16ZM14.24 32.16H16.8V34.72H14.24V32.16ZM6.56 32.16H9.12V34.72H6.56V32.16ZM62.88 29.6H68V32.16H62.88V29.6ZM57.76 29.6H60.32V32.16H57.76V29.6ZM47.52 29.6H52.64V32.16H47.52V29.6ZM42.4 29.6H44.96V32.16H42.4V29.6ZM34.72 29.6H37.28V32.16H34.72V29.6ZM16.8 29.6H24.48V32.16H16.8V29.6ZM11.68 29.6H14.24V32.16H11.68V29.6ZM6.56 29.6H9.12V32.16H6.56V29.6ZM52.64 27.04H65.44V29.6H52.64V27.04ZM39.84 27.04H44.96V29.6H39.84V27.04ZM21.92 27.04H34.72V29.6H21.92V27.04ZM62.88 24.48H68V27.04H62.88V24.48ZM47.52 24.48H50.08V27.04H47.52V24.48ZM39.84 24.48H42.4V27.04H39.84V24.48ZM32.16 24.48H34.72V27.04H32.16V24.48ZM19.36 24.48H27.04V27.04H19.36V24.48ZM6.56 24.48H9.12V27.04H6.56V24.48ZM37.28 21.92H39.84V24.48H37.28V21.92ZM50.08 19.36H68V21.92H50.08V19.36ZM44.96 19.36H47.52V21.92H44.96V19.36ZM39.84 19.36H42.4V21.92H39.84V19.36ZM34.72 19.36H37.28V21.92H34.72V19.36ZM29.6 19.36H32.16V21.92H29.6V19.36ZM24.48 19.36H27.04V21.92H24.48V19.36ZM4 19.36H21.92V21.92H4V19.36ZM65.44 16.8H68V19.36H65.44V16.8ZM50.08 16.8H52.64V19.36H50.08V16.8ZM44.96 16.8H47.52V19.36H44.96V16.8ZM34.72 16.8H42.4V19.36H34.72V16.8ZM19.36 16.8H21.92V19.36H19.36V16.8ZM4 16.8H6.56V19.36H4V16.8ZM65.44 14.24H68V16.8H65.44V14.24ZM55.2 14.24H62.88V16.8H55.2V14.24ZM50.08 14.24H52.64V16.8H50.08V14.24ZM44.96 14.24H47.52V16.8H44.96V14.24ZM37.28 14.24H39.84V16.8H37.28V14.24ZM29.6 14.24H34.72V16.8H29.6V14.24ZM19.36 14.24H21.92V16.8H19.36V14.24ZM9.12 14.24H16.8V16.8H9.12V14.24ZM4 14.24H6.56V16.8H4V14.24ZM65.44 11.68H68V14.24H65.44V11.68ZM55.2 11.68H62.88V14.24H55.2V11.68ZM50.08 11.68H52.64V14.24H50.08V11.68ZM39.84 11.68H47.52V14.24H39.84V11.68ZM27.04 11.68H29.6V14.24H27.04V11.68ZM19.36 11.68H21.92V14.24H19.36V11.68ZM9.12 11.68H16.8V14.24H9.12V11.68ZM4 11.68H6.56V14.24H4V11.68ZM65.44 9.12H68V11.68H65.44V9.12ZM55.2 9.12H62.88V11.68H55.2V9.12ZM50.08 9.12H52.64V11.68H50.08V9.12ZM44.96 9.12H47.52V11.68H44.96V9.12ZM39.84 9.12H42.4V11.68H39.84V9.12ZM29.6 9.12H34.72V11.68H29.6V9.12ZM19.36 9.12H21.92V11.68H19.36V9.12ZM9.12 9.12H16.8V11.68H9.12V9.12ZM4 9.12H6.56V11.68H4V9.12ZM65.44 6.56H68V9.12H65.44V6.56ZM50.08 6.56H52.64V9.12H50.08V6.56ZM37.28 6.56H39.84V9.12H37.28V6.56ZM29.6 6.56H32.16V9.12H29.6V6.56ZM24.48 6.56H27.04V9.12H24.48V6.56ZM19.36 6.56H21.92V9.12H19.36V6.56ZM4 6.56H6.56V9.12H4V6.56ZM50.08 4H68V6.56H50.08V4ZM39.84 4H42.4V6.56H39.84V4ZM29.6 4H34.72V6.56H29.6V4ZM24.48 4H27.04V6.56H24.48V4ZM4 4H21.92V6.56H4V4Z"
                        fill="#18181A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_55_713">
                        <rect
                          width="64"
                          height="64"
                          fill="white"
                          transform="translate(4 4)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div>
                <img src="/assets/about/barcode.svg" />
                <p className="text-[8px] tracking-[11px] text-center w-full">
                  CONTRACT ADDRESS
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 flex items-center justify-center border-b-2 h-64">
            <p className="text-xl font-bold">
              WHEN USER PAYS <u>Pr</u>
              <br />
              THROUGH <u>CONTRACT</u>:
              <br />
              <br />
              <u>Ts</u> IS REVEALD TO USER
            </p>
          </div>
        </article>

        <form></form>
      </div>
    </main>
  );
}
