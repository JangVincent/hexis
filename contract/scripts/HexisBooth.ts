import hre from "hardhat";

async function main() {
  // HexisBooth 컨트랙트의 아티팩트와 주소를 명시적으로 지정해야 합니다.
  // 예시로, 아티팩트와 constructor 파라미터가 없다고 가정합니다.
  const contract = await hre.viem.getContractAt(
    "HexisBooth",
    "0x5e0e2EF21721c1fF577b495427Eb426B5C2ABe8a",
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
