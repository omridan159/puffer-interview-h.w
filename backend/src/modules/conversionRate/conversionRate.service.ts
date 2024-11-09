import { BigNumber, ethers } from 'ethers';
import config from '../../config/config';

const provider = new ethers.providers.InfuraProvider('homestead', {
  projectId: config.infura.projectId,
});

const PUFFERVAULTV2_ADDRESS = '0xD9A442856C234a39a81a089C06451EBAa4306a72';

// ABI with totalAssets and totalSupply functions
const PufferVaultV2Abi = [
  {
    inputs: [],
    name: 'totalAssets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const fetchConversionRate = async (): Promise<number> => {
  const contract = new ethers.Contract(PUFFERVAULTV2_ADDRESS, PufferVaultV2Abi, provider);

  const [totalAssets, totalSupply]: [BigNumber, BigNumber] = await Promise.all([
    contract['totalAssets'](),
    contract['totalSupply'](),
  ]);

  if (totalSupply.isZero()) {
    throw new Error('Total supply is zero, cannot calculate conversion rate.');
  }

  // Assuming both totalAssets and totalSupply are in wei (18 decimals)
  // Calculate conversionRate = totalAssets / totalSupply
  // Since BigNumbers don't support division that results in fractions, we multiply first to retain precision
  const conversionRateBN = totalAssets.mul(ethers.constants.WeiPerEther).div(totalSupply);

  // Convert BigNumber to a decimal string and then to a number
  const conversionRate = parseFloat(ethers.utils.formatUnits(conversionRateBN, 18));

  return conversionRate;
};
