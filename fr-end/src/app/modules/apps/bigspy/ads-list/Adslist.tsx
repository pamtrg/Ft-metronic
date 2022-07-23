
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import { Private } from './components/Private'


const AdsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
    <Private />
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {AdsListWrapper}
