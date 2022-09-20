import { Network, SupportedTokens } from './constants';

export const LOOP_TOKEN_DISTRIBUTOR = {
  [Network.MAINNET]: {
    address: '',
    codeId: 0,
  },
  [Network.TESTNET]: {
    address: 'terra1x0xfms5p4k7fn85s908ykardvl2p38lk6dn5hh',
    codeId: 36147,
  },
};

// export const LOOP_NFT_STAKING = 'terra1zlcr85wcuacx2qvrqzj99ya3ng2vrxervyt8h2';
export const LOOP_NFT_STAKING = {
  [Network.MAINNET]: {
    address: '',
    codeId: 0,
  },
  [Network.TESTNET]: {
    address: 'terra16ggvdragnytpqvr8ypx69wyjqgmrc8rg0c6u8j',
    codeId: 36149,
  },
};

// export const LOOP_NFT_MINTER = 'terra15z7ckl7z98dzl77q088jcalsag9vh4ufck4qjq';
export const LOOP_NFT_MINTER = {
  [Network.MAINNET]: {
    address: '',
    codeId: 0,
  },
  [Network.TESTNET]: {
    address: 'terra1ln02srzdlpgtaj2zm8l8qlg9tj5ast254c42uz',
    codeId: 36138,
  },
};

// export const LOOP_NFT_TOKEN = 'terra1wg0gvt4603j2k2llr7cf08kwh2fffkd9h8k7x5';
export const LOOP_NFT_TOKEN = {
  [Network.MAINNET]: {
    address: '',
    codeId: 0,
  },
  [Network.TESTNET]: {
    address: 'terra1s4cmcaxspy3ppqyf3stad95vxu98xqgfyz59zj',
    codeId: 36139,
  },
};

export const ContractAddressMap = {
  [Network.MAINNET]: {
    [SupportedTokens.LOOP]: 'terra1nef5jf6c7js9x6gkntlehgywvjlpytm7pcgkn4',
    [SupportedTokens.LOOPR]: 'terra1jx4lmmke2srcvpjeereetc9hgegp4g5j0p9r2q',
    [SupportedTokens.ARTS]: 'terra1g0pm8xm5c2dq4qtv8j9a80hg4mhe5ndy8qad07',
    uLP: 'terra1f0nj4lnggvc7r8l3ay5jx7q2dya4gzllez0jw2',
    ARTSuLP: 'terra1k6y57qfvq20mlf020s6v98gghaypy34v0q4rqh'
  },
  [Network.TESTNET]: {
    [SupportedTokens.LOOP]: 'terra1eux993n3l5f77fy0tdlpjeyj5xfasf0sst830t',
    [SupportedTokens.LOOPR]: 'terra1ykagvyzdmj3jcxkhavy7l84qs66haf7akqfrkc',
    [SupportedTokens.ARTS]: '',
    uLP: 'terra172nsh8wugzn8cf8rxu9nf4gr0xg32ey2v3m83y',
    ARTSuLP: ''
  },
};

export const LOOP_UST_POOL = {
  [Network.MAINNET]: "terra106a00unep7pvwvcck4wylt4fffjhgkf9a0u6eu",
  [Network.TESTNET]: "terra1s8u472dzj2ukdk6gl0l4rw2c2aehflppgtmq99"
}

export const ARTS_UST_POOL = {
  [Network.MAINNET]: "terra1p0ne6gzy3mamyepm5c0r0wvwyac2cexrmvkz0p",
  [Network.TESTNET]: ""
}

export const LOOPR_UST_POOL = {
  [Network.MAINNET]: "terra1dw5j23l6nwge69z0enemutfmyc93c36aqnzjj5",
  [Network.TESTNET]: ""
}

export const LOOP_UST_FARM = {
  [Network.MAINNET]: {
    contract: "terra1cr7ytvgcrrkymkshl25klgeqxfs48dq4rv8j26",
    uLF: "terra1nkqjwr3lsya7vhamq53g5hmxnfkdz3ayzqp8y9"
  },
  [Network.TESTNET]: {
    contract: "",
    uLF: ""
  }
}

export const ARTS_UST_FARM = {
  [Network.MAINNET]: {
    contract: "terra1swgnlreprmfjxf2trul495uh4yphpkqucls8fv",
    uLF: "terra1gpzxrks9vphjlh2w2cswdduhm3pcrcme6ypdu6"
  },
  [Network.TESTNET]: {
    contract: "",
    uLF: ""
  }
}

export const LOOP_STAKING_POOL = {
  [Network.MAINNET]: {
    '3M': "terra1th3s05dh6qjk5nngthxsl4d8sv7k05svpjlr87",
    '12M': "terra1nd3x2cqaqffp9xfa8epp5lw4cyc48rr4qz4v9d",
    '18M': "terra1gaawzzmma5s465w4suzlmmpspef89tp4dysl2f"
  },
  [Network.TESTNET]: {
    '3M': "terra1epyemnzd7g6ppwamhtr0k2hj8ng20fmhupgq2h",
    '12M': "terra10hsye9ujg76l0ahwlnnx8m59vhjagr0wq99cr2",
    '18M': "terra1es25286fzjamjtxllh9jus8m9d92vznmh276d4"
  }
}

//farm?
// [Network.MAINNET]: "terra1jqjpa66ethxc8wkkv5dvtvv7mp546expls6lw4",
//uLF: terra1hd7n4mvg7pkgk7y8fzry3uh5m9l3az45dlnps2
//terra1cr7ytvgcrrkymkshl25klgeqxfs48dq4rv8j26
//uLF: "terra1nkqjwr3lsya7vhamq53g5hmxnfkdz3ayzqp8y9"