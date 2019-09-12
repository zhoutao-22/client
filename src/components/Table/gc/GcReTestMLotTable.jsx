
import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import AsyncManagerRequest from '../../../api/gc/async-manager/AsyncManagerRequest';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import RetestManagerRequest from '../../../api/gc/retest-manager/RetestManagerRequest';

/**
 * 重测发料的物料批次表格
 */
export default class GcReTestMLotTable extends EntityScanViewTable {

    static displayName = 'OrderTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createReTest());
        return buttons;
    }

    reTest = () => {
        let orderTabel = this.props.orderTable;
        let order = orderTabel.getSingleSelectedRow();
        if (!order) {
            return;
        }
        let materialLots = this.state.data;
        if (materialLots.length === 0 ) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            documentLine : order,
            materialLots : materialLots,
            success: function() {
                console.log("ok");
            }
        }
        RetestManagerRequest.sendRetestRequest(requestObject)
    }
     /**
     * 重测
     */
    createReTest = () => {
        return <Button key="asyncErp" type="primary" style={styles.tableButton} icon="file-excel" onClick={this.reTest}>
                        发料
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
