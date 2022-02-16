const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    // nested mappings are rough :} 
    const signer1 = ethers.provider.getSigner(0);
    const addr1 = await signer1.getAddress();

    const signer2 = ethers.provider.getSigner(1);
    const addr2 = await signer2.getAddress();

    game.connect(signer2).write(addr1);

    await game.connect(signer1).win(addr2);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
