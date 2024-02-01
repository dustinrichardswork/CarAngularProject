import { GridBase } from "./grid-base";

export abstract class GridDecoratorBase {
  abstract buildGrid(grid: GridBase);
}
