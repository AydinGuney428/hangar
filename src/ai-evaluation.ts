export type EvaluationDimension = {
  name: string;
  weight: number;
  passed: boolean;
  note: string;
};

export type EvaluationResult = {
  score: number;
  passed: boolean;
  dimensions: EvaluationDimension[];
};

export type CandidateAnswer = {
  answer: string;
  citesEvidence: boolean;
  acknowledgesUncertainty: boolean;
  followsRequiredFormat: boolean;
  containsUnsupportedClaim: boolean;
};

const weights = {
  evidence: 0.35,
  uncertainty: 0.2,
  format: 0.2,
  factualDiscipline: 0.25,
} as const;

export function evaluateCandidate(candidate: CandidateAnswer): EvaluationResult {
  const dimensions: EvaluationDimension[] = [
    {
      name: 'evidence',
      weight: weights.evidence,
      passed: candidate.citesEvidence,
      note: candidate.citesEvidence
        ? 'Claims are tied to explicit evidence.'
        : 'Claims are not tied to explicit evidence.',
    },
    {
      name: 'uncertainty',
      weight: weights.uncertainty,
      passed: candidate.acknowledgesUncertainty,
      note: candidate.acknowledgesUncertainty
        ? 'Uncertainty is stated where appropriate.'
        : 'Uncertainty is not acknowledged.',
    },
    {
      name: 'format',
      weight: weights.format,
      passed: candidate.followsRequiredFormat,
      note: candidate.followsRequiredFormat
        ? 'Required output format is respected.'
        : 'Required output format is violated.',
    },
    {
      name: 'factual-discipline',
      weight: weights.factualDiscipline,
      passed: !candidate.containsUnsupportedClaim,
      note: candidate.containsUnsupportedClaim
        ? 'Contains at least one unsupported claim.'
        : 'No unsupported claims detected by the supplied checks.',
    },
  ];

  const score = Math.round(
    dimensions.reduce((sum, item) => sum + (item.passed ? item.weight : 0), 0) * 100,
  );

  return {
    score,
    passed: score >= 80 && !candidate.containsUnsupportedClaim,
    dimensions,
  };
}
