import { HomeClient } from './HomeClient';
import { getPageConfig } from '../data/index';

export const metadata = {
    title: 'Architectenbureau Jules Zwijsen | Van Binnen Naar Buiten',
    description: 'Architectenbureau Jules Zwijsen ontwerpt moderne, duurzame villa\'s en woningen. Van schets tot oplevering, volledig op maat.',
};

export default function Page() {
    const pageConfig = getPageConfig('default');

    return <HomeClient initialConfig={pageConfig} />;
}
