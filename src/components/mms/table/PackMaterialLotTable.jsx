
import { InboxOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';
import PackageMaterialLotRequest from '@api/package-material-lot/PackageMaterialLotRequest';
import { PrintServiceUrl, PrintBboxCount } from '@api/gc/GcConstDefine';
import GetPrintBboxParameterRequest from '@api/gc/get-print-bbox-parameter/GetPrintBboxParameterRequest';
import PrintUtils from '@api/utils/PrintUtils';
import * as PropTypes from 'prop-types';

/**
 * 包装物料批次
 */
export default class PackMaterialLotTable extends EntityScanViewTable {

    static displayName = 'PackMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMLotTotalQtyTag());
        buttons.push(this.createPackageButton());
        return buttons;
    }
    
    createMLotTotalQtyTag =()=>{
        let datas = [];
        let mlotTotalQty = 0;
        datas = this.state.data ;
        datas.forEach(data => {
            mlotTotalQty += data.currentQty
        });
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.Qty)}：{mlotTotalQty}</Tag>
    }
    
    handlePrint = (materialLot) => {
        let requestObject = {
            materialLotRrn : materialLot.objectRrn,    
            success: function(responseBody) {
                let url = PrintServiceUrl.Bbox;
                PrintUtils.printWithBtIbForWeb(url, responseBody.parameters, PrintBboxCount);
            }
        }
        GetPrintBboxParameterRequest.sendQueryRequest(requestObject);
    }

    package = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLots: data,
            packageType: this.props.packageType,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                let materialLotId = responseBody.materialLot.materialLotId;
                let message = I18NUtils.getClientMessage(i18NCode.OperationSucceed) + `:${materialLotId}`;
                NoticeUtils.showSuccess(message);

                //self.handlePrint(responseBody.materialLot);
            }
        }
        PackageMaterialLotRequest.sendPackMaterialLotsRequest(requestObject)
    }

    createPackageButton = () => {
        return (
            <Button key="receive" type="primary" className="table-button" icon={<InboxOutlined />} onClick={this.package}>
                            {I18NUtils.getClientMessage(i18NCode.BtnPackage)}
                        </Button>
        );
    }

}

PackMaterialLotTable.prototypes = {
    table: PropTypes.object.isRequired,
    data: PropTypes.array,
    rowClassName: PropTypes.func,
    rowkey: PropTypes.string,
    pagination: PropTypes.pagination,
    selectedRowKeys: PropTypes.array,
    selectedRows: PropTypes.array,
    resetFlag: PropTypes.bool,
    resetData: PropTypes.func,
    packageType: PropTypes.string.isRequired
}

