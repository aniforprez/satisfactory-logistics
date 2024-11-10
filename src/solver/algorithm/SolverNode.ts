import type {
  FactoryInputConstraint,
  FactoryOutput,
} from '@/factories/Factory';
import type { FactoryItem } from '@/recipes/FactoryItem';
import type { FactoryRecipe } from '@/recipes/FactoryRecipe';

export type SolverResourceNode = {
  type: 'resource';
  label: string;
  resource: FactoryItem;
  variable: string;
};

export type SolverRawNode = {
  type: 'raw';
  label: string;
  resource: FactoryItem;
  variable: string;
  // TODO This doesn't work for raw resources, only for raw inputs.
  constraint?: FactoryInputConstraint;
  inputIndex?: number;
};

export type SolverRawInputNode = {
  type: 'raw_input';
  label: string;
  resource: FactoryItem;
  variable: string;
  constraint?: FactoryInputConstraint;
  inputIndex?: number;
};

export type SolverOutputNode = {
  type: 'output';
  label: string;
  recipe: FactoryRecipe;
  recipeMainProductVariable: string;
  resource: FactoryItem;
  variable: string;
  amplifiedVariable: string;
  originalVariable: string;
  byproductVariable: string;
};

export type SolverByproductNode = {
  type: 'byproduct';
  label: string;
  resource: FactoryItem;
  variable: string;
  /**
   * If the byproduct is required by the user, we store it here.
   * This is further used to set maximization objectives.
   */
  output?: FactoryOutput;
};

export type SolverInputNode = {
  type: 'input';
  label: string;
  recipe: FactoryRecipe;
  recipeMainProductVariable: string;
  resource: FactoryItem;
  variable: string;
};

export type SolverEnergyNode = {
  type: 'energy';
  label: string;
  recipe: FactoryRecipe;
  variable: string;
  // Only after solving
  value?: number;
};

export type SolverAreaNode = {
  type: 'area';
  variable: string;
  // Only after solving
  value?: number;
};

export type SolverNode =
  | SolverRawNode
  | SolverRawInputNode
  | SolverOutputNode
  | SolverByproductNode
  | SolverInputNode
  | SolverResourceNode
  | SolverEnergyNode
  | SolverAreaNode;

export type SolverEdge = {
  type: 'link';
  resource: FactoryItem;
  source: FactoryRecipe | 'world';
  target: FactoryRecipe;
  variable: string;
  label: string;
};
