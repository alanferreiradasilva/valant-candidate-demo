import { Shallow } from 'shallow-render';
import { MazeNewComponent } from './maze-new.component';
import { ComponentsModule } from '../components.module';

describe('MazeCardComponent', () => {
  let component: Shallow<MazeNewComponent>;

  beforeEach(() => {
    component = new Shallow(MazeNewComponent, ComponentsModule);
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('should have as title "Maze Card demo"', async () => {
    const { instance } = await component.render();
    expect(instance.title).toBe('Maze new');
  });
});
