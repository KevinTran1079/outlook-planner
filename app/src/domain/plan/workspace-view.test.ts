import { createPlanningWorkspaceView } from './workspace-view';

describe('createPlanningWorkspaceView', () => {
  it('keeps milestone balance bars within their container', () => {
    const workspace = createPlanningWorkspaceView();

    expect(
      workspace.milestones.every(
        (milestone) =>
          milestone.balancePercent >= 0 && milestone.balancePercent <= 100,
      ),
    ).toBe(true);
    expect(
      workspace.milestones.some(
        (milestone) => milestone.balancePercent === 100,
      ),
    ).toBe(true);
  });
});
