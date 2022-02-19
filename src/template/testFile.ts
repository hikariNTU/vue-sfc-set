const getTestText = (name: string) => 
`import { render } from '@testing-library/vue';
import ${name} from './${name}.vue';

describe('${name}', () => {
  it('Render without error', async () => {
    render(${name});
  });
});
`;

export {getTestText};