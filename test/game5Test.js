const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    const signer = ethers.provider.getSigner(0);

    let randomSigner = ethers.Wallet.createRandom();
    while(BigInt('' + randomSigner.address) > BigInt('0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf')) {
      randomSigner = ethers.Wallet.createRandom();
    }
    console.log("signer private key: ", randomSigner.privateKey);
    console.log("signer address: ", randomSigner.address);

    // randomSigner.connect(ethers.provider);

    randomSigner = new ethers.Wallet(randomSigner.privateKey, ethers.provider);

    await signer.sendTransaction({
      value: ethers.utils.parseEther("1"),
      to: randomSigner.address
    });

    await game.connect(randomSigner).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
