const { expect } = require("chai")
const { ethers } = require("hardhat")


const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", () => {
    let ethDaddy
    let deployer, owner1

    const NAME = 'ETH Daddy'
    const SYMBOL = 'ETHD'

    beforeEach(async () => {
        //get test accounts
        [deployer, owner1] = await ethers.getSigners()

        //deploy contract
        const ETHDaddy = await ethers.getContractFactory('ETHDaddy')
        ethDaddy = await ETHDaddy.deploy('ETH Daddy', 'ETHD')

        //list a domain
        const transaction = await ethDaddy.connect(deployer).list('jack.eth', tokens(7))
        //await transaction.wait()


    })

    describe ('Deployment', () => {
        it('has a name', async () => {
            let result = await ethDaddy.name()
            expect(result).to.equal(NAME)
        }) 
    
        it('has a symbol', async () => {
            let result = await ethDaddy.symbol()
            expect(result).to.equal(SYMBOL)
        })


        it('set the owner', async () => {
            let result = await ethDaddy.owner()
            console.log('Onwer address: ', result)
            console.log('Deployer address: ', deployer.address)
            expect(result).to.equal(deployer.address)
        })
    })

    describe ('Domain', () => {
        it('returns domain attributes', async () => {
            let domain = await ethDaddy.domains(1)
            expect(domain.name).to.be.equal('jack.eth')
            expect(domain.cost).to.be.equal(tokens(7))
            expect(domain.isOwned).to.be.equal(false)
        })
    })

    }
  
   
)