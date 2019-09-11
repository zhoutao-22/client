import Home from './pages/Home';

import BlankLayout from './layouts/BlankLayout';
import Login from './pages/Login';

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';

import NotFound from './pages/NotFound';
import EntityProperties from './pages/Properties';
import UserProperties from './pages/Properties/components/userProperties/UserProperties';
import RoleProperties from './pages/Properties/components/RoleProperties';
import GeneratorRuleProperties from './pages/Properties/components/GeneratorRuleProperties';
import MaterialStatusModelProperties from './pages/Properties/components/MaterialStatusModelProperties';
import MaterialProperties from './pages/Properties/components/MaterialProperties';
import MaterialLotProperties from './pages/Properties/components/MaterialLotProperties';
import MaterialLotInventoryProperties from './pages/Properties/components/MaterialLotInventoryProperties';
import EntityHistoryProperties from './pages/Properties/components/EntityHistoryProperties';
import DynaxAnalyseProperties from './pages/Properties/components/DynaxAnalyseProperties';
import QuestionProperties from './pages/Properties/components/QuestionProperties';
import MesFinishGoodProperties from './pages/Properties/components/MesFinishGoodProperties';
import PackageMaterialLotProperties from './pages/Properties/components/PackageMaterialLotProperties';
import PackRelayBoxProperties from './pages/Properties/components/PackRelayBoxProperties';
import PackCaseCheckProperties from './pages/Properties/components/PackCaseCheckProperties';
import MaterialLotStockInProperties from './pages/Properties/components/MaterialLotStockInProperties';
import UnPackagaMaterialLotProperties from './pages/Properties/components/UnPackagaMaterialLotProperties';
import StockOutCheckProperties from './pages/Properties/components/StockOutCheckProperties';
import GcOrderProperties from './pages/Properties/components/GcOrderProperties';
import GcReTestOrderProperties from './pages/Properties/components/GcReTestOrderProperties';
import AddPackagaMaterialLotProperties from './pages/Properties/components/AddPackagaMaterialLotProperties';
import GcPrintCaseLabelProperties from './pages/Properties/components/GcPrintCaseLabelProperties';

const routerConfig = [
  {
    path: '/',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/Home',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Home,
  },
  {
    path: 'System/OnlineTableManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/OnlineTabManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/OnlineFieldManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/OnlineRefTableManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/SysRefNameManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/OrgRefNameManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'System/MessageManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'Security/UserManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UserProperties,
  },
  {
    path: 'Security/RoleManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: RoleProperties,
  },
  //KMS
  {
    path: 'KMS/QuestionManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: QuestionProperties,
  }, 
  {
    path: 'KMS/QuestionHisManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  }, 
  //LMS
  {
    path: 'LMS/IDGeneratorRuleManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: GeneratorRuleProperties,
  },
  //MMS
  {
    path: '/MMS/StatusModelManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialStatusModelProperties,
  },
  {
    path: '/MMS/StatusCategoryManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/MMS/StatusManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/MMS/EventManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/MMS/RawMaterialManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialProperties,
  },
  {
    path: '/MMS/MaterialLotManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotProperties,
  },
  {
    path: '/MMS/MaterialLotHistoryManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityHistoryProperties,
  },
  {
    path: 'MMS/MLotMergeRuleManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  //MES成品接收
  {
    path: '/MMS/MESFinishGoodManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MesFinishGoodProperties,
  },
  //Doc
  {
    path: '/Doc/DeliveryOrderManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcOrderProperties,
  },
  {
    path: '/Doc/ReTestOrderManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcReTestOrderProperties,
  },
  //WMS
  {
    path: '/WMS/WarehouseManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/WMS/MLotInventoryManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotInventoryProperties,
  },
  {
    path: '/WMS/StorageManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/WMS/MaterialLotStockIn/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: MaterialLotStockInProperties,
  },
  //PackManager
  {
    path: '/Pack/PackRuleManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '/Pack/PackMaterialLot/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackageMaterialLotProperties,
  },
  {
    path: '/Pack/AddPackMaterialLot/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: AddPackagaMaterialLotProperties,
  },
  {
    path: '/Pack/UnPackMaterialLot/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: UnPackagaMaterialLotProperties,
  },
  {
    path: '/Pack/PackRelayBox/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackRelayBoxProperties,
  },
  {
    path: '/Pack/PackCaseCheck/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: PackCaseCheckProperties,
  },
  {
    path: '/Pack/StockOutCheck/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: StockOutCheckProperties,
  },
  {
    path: '/Pack/PrintCaseLabel/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: GcPrintCaseLabelProperties,
  },
  //RTM
  {
    path: '/RTM/DynaxAnalyseManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: DynaxAnalyseProperties,
  },
  //RMS
  {
    path: 'Rms/EquipmentManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: 'Rms/RecipeManager/:tableRrn',
    layout: HeaderAsideFooterResponsiveLayout,
    component: EntityProperties,
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
