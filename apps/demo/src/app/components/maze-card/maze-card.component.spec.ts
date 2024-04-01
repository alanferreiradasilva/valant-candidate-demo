import { Shallow } from 'shallow-render';
import { MazeCardComponent } from './maze-card.component';
import { ComponentsModule } from '../components.module';

describe('MazeCardComponent', () => {
  let component: Shallow<MazeCardComponent>;

  beforeEach(() => {
    component = new Shallow(MazeCardComponent, ComponentsModule);
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('should have as title "Maze Card demo"', async () => {
    const { instance } = await component.render();
    expect(instance.title).toBe('Maze Card demo');
  });
});
