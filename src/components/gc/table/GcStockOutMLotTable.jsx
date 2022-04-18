
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { FileExcelOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import NoticeUtils from '@utils/NoticeUtils';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import StockOutManagerRequest from '@api/gc/stock-out/StockOutManagerRequest';

/**
 * 重测发料的物料批次表格
 */
export default class GcStockOutMLotTable extends EntityScanViewTable {

    static displayName = 'GcStockOutMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createStockOut());
        return buttons;
    }

    stockOut = () => {
        let self = this;
        let orderTabel = this.props.orderTable;
        let order = orderTabel.getSingleSelectedRow();
        if (!order) {
            return;
        }
        let materialLots = this.state.data;
        if (materialLots.length === 0 ) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            documentLine : order,
            materialLots : materialLots,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                NoticeUtils.showSuccess();
            }
        }
        StockOutManagerRequest.sendStockOutRequest(requestObject)
    }

    createStockOut = () => {
        return (
            <Button key="stockOut" type="primary" className="table-button" icon={<FileExcelOutlined />} onClick={this.stockOut}>
                            发货
                        </Button>
        );
    }
}


