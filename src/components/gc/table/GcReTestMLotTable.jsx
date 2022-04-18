
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { FileExcelOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import NoticeUtils from '@utils/NoticeUtils';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import RetestManagerRequest from '@api/gc/retest-manager/RetestManagerRequest';

/**
 * 重测发料的物料批次表格
 */
export default class GcReTestMLotTable extends EntityScanViewTable {

    static displayName = 'GcReTestMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createReTest());
        return buttons;
    }

    reTest = () => {
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
        RetestManagerRequest.sendRetestRequest(requestObject);
    }

     /**
     * 发料
     */
    createReTest = () => {
        return (
            <Button key="reTest" type="primary" className="table-button" icon={<FileExcelOutlined />} onClick={this.reTest}>
                            发料
                        </Button>
        );
    }

}


