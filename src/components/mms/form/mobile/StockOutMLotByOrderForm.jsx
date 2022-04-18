import VcMaterialLotInventoryRequest from "@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest";
import MobileForm from "@components/framework/form/MobileForm";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

export default class StockOutMLotByOrderForm extends MobileForm {
    static displayName = 'StockOutMLotByOrderForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name === "docId") {
            fieldEnter[queryField.name] = () => this.docIdEnterEvent(queryField);
        }
    }

    docIdEnterEvent = (queryField) => {
        let queryFields = this.state.queryFields;
        let docId = this.props.form.getFieldsValue()[queryField.name];
        let self = this;
        let object = {
            documentId: docId,
            success: function(responseBody) {
                self.props.dataTable.setState({
                    data: responseBody.materialLots
                });
            }
        }
        VcMaterialLotInventoryRequest.sendGetStockOutMLotByOrderRequest(object);
        if (queryFields && Array.isArray(queryFields)) {
            let dataIndex = queryFields.indexOf(queryField);
            this.nextElementFocus(dataIndex, queryFields);
        }
    }

    onLastFieldEnter = () => {
        let formObject = this.props.form.getFieldsValue();
        let tableData = this.props.dataTable.state.data;
        let scandMaterialLot = undefined;
        let showData = [];
        tableData.map((materialLot, index) => {
            if (materialLot.materialLotId == formObject.materialLotId && materialLot.lastStorageId == formObject.storageId) {
                materialLot.scaned = true;
                scandMaterialLot = materialLot;
                showData.unshift(materialLot);
            }else {
                showData.push(materialLot);
            }
        });
        
        if (!scandMaterialLot) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
        } else {
            this.props.dataTable.setState({
                data: showData
            });
        }
        this.props.form.setFieldsValue({
            materialLotId: "",
            storageId: ""
        });
        document.getElementById("materialLotId").focus();
    }
}

const WrappedStockOutMLotByOrderForm = Form.create()(StockOutMLotByOrderForm);
export {WrappedStockOutMLotByOrderForm};

 