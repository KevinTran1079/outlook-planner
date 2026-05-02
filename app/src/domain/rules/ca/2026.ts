import type { CanadaRules, RuleSource, TaxBracket } from './types';

const retrievedAt = '2026-05-02';

const payrollFormulaSource: RuleSource = {
  title: 'CRA T4127 Payroll Deductions Formulas, 122nd edition, 2026',
  url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4127-payroll-deductions-formulas/t4127-jan/t4127-jan-payroll-deductions-formulas-computer-programs.html',
  retrievedAt,
  effectiveFrom: '2026-01-01',
  effectiveTo: '2026-12-31',
};

const tfsaSource: RuleSource = {
  title: 'CRA: Calculate your TFSA contribution room',
  url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributing/calculate-room.html',
  retrievedAt,
  effectiveFrom: '2026-01-01',
  effectiveTo: '2026-12-31',
};

const rrspSource: RuleSource = {
  title: 'CRA: MP, DB, RRSP, DPSP, ALDA, TFSA limits, YMPE and YAMPE',
  url: 'https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html',
  retrievedAt,
  effectiveFrom: '2026-01-01',
  effectiveTo: '2026-12-31',
};

const rrifSource: RuleSource = {
  title: 'Budget 2015 Annex 5: Existing and New RRIF Factors',
  url: 'https://www.budget.canada.ca/2015/docs/plan/anx5-1-eng.html',
  retrievedAt,
  effectiveFrom: '2015-01-01',
};

const cppSource: RuleSource = {
  title: 'Service Canada: CPP retirement pension timing and 2026 amounts',
  url: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-benefit/when-start.html',
  retrievedAt,
  effectiveFrom: '2026-01-01',
  effectiveTo: '2026-12-31',
};

const oasSource: RuleSource = {
  title: 'Service Canada: OAS timing and OAS recovery tax',
  url: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/when-start.html',
  retrievedAt,
  effectiveFrom: '2026-04-01',
  effectiveTo: '2026-06-30',
};

const quebecSource: RuleSource = {
  title: 'Revenu Quebec: Principal Changes for 2026',
  url: 'https://www.revenuquebec.ca/en/businesses/source-deductions-and-employer-contributions/employers-principal-changes-for-2026/',
  retrievedAt,
  effectiveFrom: '2026-01-01',
  effectiveTo: '2026-12-31',
};

function bracket(
  thresholdDollars: number,
  rate: number,
  constantDollars: number,
): TaxBracket {
  return {
    thresholdCents: thresholdDollars * 100,
    rate,
    constantCents: constantDollars * 100,
  };
}

export const canadaRules2026: CanadaRules = {
  version: 'CA-2026.1',
  currency: 'CAD',
  federalTax: {
    brackets: [
      bracket(0, 0.14, 0),
      bracket(58523, 0.205, 3804),
      bracket(117045, 0.26, 10241),
      bracket(181440, 0.29, 15685),
      bracket(258482, 0.33, 26024),
    ],
    basicPersonalAmountCents: 1645200,
    source: payrollFormulaSource,
  },
  provinceTax: {
    AB: {
      province: 'AB',
      brackets: [
        bracket(0, 0.08, 0),
        bracket(61200, 0.1, 1224),
        bracket(154259, 0.12, 4309),
        bracket(185111, 0.13, 6160),
        bracket(246813, 0.14, 8628),
        bracket(370220, 0.15, 12331),
      ],
      source: payrollFormulaSource,
    },
    BC: {
      province: 'BC',
      brackets: [
        bracket(0, 0.0506, 0),
        bracket(50363, 0.077, 1330),
        bracket(100728, 0.105, 4150),
        bracket(115648, 0.1229, 6220),
        bracket(140430, 0.147, 9604),
        bracket(190405, 0.168, 13603),
        bracket(265545, 0.205, 23428),
      ],
      source: payrollFormulaSource,
    },
    MB: {
      province: 'MB',
      brackets: [
        bracket(0, 0.108, 0),
        bracket(47000, 0.1275, 917),
        bracket(100000, 0.174, 5567),
      ],
      source: payrollFormulaSource,
    },
    NB: {
      province: 'NB',
      brackets: [
        bracket(0, 0.094, 0),
        bracket(52333, 0.14, 2407),
        bracket(104666, 0.16, 4501),
        bracket(193861, 0.195, 11286),
      ],
      source: payrollFormulaSource,
    },
    NL: {
      province: 'NL',
      brackets: [
        bracket(0, 0.087, 0),
        bracket(44678, 0.145, 2591),
        bracket(89354, 0.158, 3753),
        bracket(159528, 0.178, 6943),
        bracket(223340, 0.198, 11410),
        bracket(285319, 0.208, 14263),
        bracket(570638, 0.213, 17117),
        bracket(1141275, 0.218, 22823),
      ],
      source: payrollFormulaSource,
    },
    NS: {
      province: 'NS',
      brackets: [
        bracket(0, 0.0879, 0),
        bracket(30995, 0.1495, 1909),
        bracket(61991, 0.1667, 2976),
        bracket(97417, 0.175, 3784),
        bracket(157124, 0.21, 9283),
      ],
      source: payrollFormulaSource,
    },
    NT: {
      province: 'NT',
      brackets: [
        bracket(0, 0.059, 0),
        bracket(53003, 0.086, 1431),
        bracket(106009, 0.122, 5247),
        bracket(172346, 0.1405, 8436),
      ],
      source: payrollFormulaSource,
    },
    NU: {
      province: 'NU',
      brackets: [
        bracket(0, 0.04, 0),
        bracket(55801, 0.07, 1674),
        bracket(111602, 0.09, 3906),
        bracket(181439, 0.115, 8442),
      ],
      source: payrollFormulaSource,
    },
    ON: {
      province: 'ON',
      brackets: [
        bracket(0, 0.0505, 0),
        bracket(53891, 0.0915, 2210),
        bracket(107785, 0.1116, 4376),
        bracket(150000, 0.1216, 5876),
        bracket(220000, 0.1316, 8076),
      ],
      source: payrollFormulaSource,
    },
    PE: {
      province: 'PE',
      brackets: [
        bracket(0, 0.095, 0),
        bracket(33928, 0.1347, 1347),
        bracket(65820, 0.166, 3407),
        bracket(106890, 0.1762, 4497),
        bracket(142250, 0.19, 6460),
      ],
      source: payrollFormulaSource,
    },
    QC: {
      province: 'QC',
      brackets: [
        bracket(0, 0.14, 0),
        bracket(54345, 0.19, 2717),
        bracket(108680, 0.24, 8151),
        bracket(132245, 0.2575, 10465),
      ],
      source: quebecSource,
    },
    SK: {
      province: 'SK',
      brackets: [
        bracket(0, 0.105, 0),
        bracket(54532, 0.125, 1091),
        bracket(155805, 0.145, 4207),
      ],
      source: payrollFormulaSource,
    },
    YT: {
      province: 'YT',
      brackets: [
        bracket(0, 0.064, 0),
        bracket(58523, 0.09, 1522),
        bracket(117045, 0.109, 3745),
        bracket(181440, 0.128, 7193),
        bracket(500000, 0.15, 18193),
      ],
      source: payrollFormulaSource,
    },
  },
  registeredAccounts: {
    tfsa: {
      annualDollarLimitCents: 700000,
      withdrawalRoomRestoredNextYear: true,
      source: tfsaSource,
    },
    rrsp: {
      dollarLimitCents: 3381000,
      earnedIncomeRate: 0.18,
      source: rrspSource,
    },
    rrif: {
      under71FormulaDenominatorAge: 90,
      minimumWithdrawalFactors: {
        71: 0.0528,
        72: 0.054,
        73: 0.0553,
        74: 0.0567,
        75: 0.0582,
        76: 0.0598,
        77: 0.0617,
        78: 0.0636,
        79: 0.0658,
        80: 0.0682,
        81: 0.0708,
        82: 0.0738,
        83: 0.0771,
        84: 0.0808,
        85: 0.0851,
        86: 0.0899,
        87: 0.0955,
        88: 0.1021,
        89: 0.1099,
        90: 0.1192,
        91: 0.1306,
        92: 0.1449,
        93: 0.1634,
        94: 0.1879,
        95: 0.2,
      },
      source: rrifSource,
    },
  },
  publicPensions: {
    cpp: {
      standardStartAge: 65,
      earliestStartAge: 60,
      latestStartAge: 70,
      earlyReductionPerMonth: 0.006,
      deferralIncreasePerMonth: 0.007,
      maxMonthlyAt65Cents: 150765,
      source: cppSource,
    },
    oas: {
      standardStartAge: 65,
      latestStartAge: 70,
      deferralIncreasePerMonth: 0.006,
      maxMonthlyAge65To74Cents: 74305,
      maxMonthlyAge75PlusCents: 81654,
      recoveryTaxRate: 0.15,
      recoveryThreshold2025IncomeCents: 9345400,
      source: oasSource,
    },
  },
};
