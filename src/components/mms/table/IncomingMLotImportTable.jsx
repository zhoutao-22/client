import React from 'react';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { DeleteOutlined, FileAddOutlined, ImportOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import EventUtils from '@api/utils/EventUtils';
import Notification from '@api/utils/NoticeUtils';
import IncomingMaterialImportRequest from '@api/Incoming-Material-Manager/IncomingMaterialImportRequest';
import { i18NCode } from '@api/const/i18n';
import SyncIncomingOrReturnMLotRequest from '@api/sync/incoming-return-mlot/SyncIncomingOrReturnMLotRequest';
import { SyncActionType } from '@api/sync/incoming-return-mlot/SyncIncomingOrReturnMLotRequestBody';
import NoticeUtils from '@api/utils/NoticeUtils';

export default class IncomingMLotImportTable extends EntityScanViewTable {

    static displayName = 'IncomingMLotImportTable';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    /**
     * 创建btn组。不同的table对button的组合要求不一样时。可以重载其方法做处理
     */
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createSyncButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createSaveButton());
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createDeleteAllButton());
        return buttons;
    }

    createSyncButton = () => {
        return (
            <Button key="Sync" type="primary" className="table-button" onClick={() => this.handleSync()} icon={<ImportOutlined />}>
                    {I18NUtils.getClientMessage(i18NCode.BtnSync)}
                </Button>
        );
    }

    createImportButton = () => {
        return (
            <Upload key="import" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                        customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                        <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon={<FileAddOutlined />}>{I18NUtils.getClientMessage(i18NCode.SelectFile)}</Button>
                    </Upload>
        );
    }

    createSaveButton = () => {
        return (
            <Button key="receive" type="primary" className="table-button" onClick={() => this.SaveButton()} icon={<ImportOutlined />}>
                             {I18NUtils.getClientMessage(i18NCode.BtnImp)}
                    </Button>
        );
    }

    createDeleteAllButton = () => {
        return (
            <Button key="delete" type="primary" className="table-button" onClick={() => this.deleteAllMaterialLot()} icon={<DeleteOutlined />}>
                             {I18NUtils.getClientMessage(i18NCode.BtnReset)}
                    </Button>
        );
    }
    
    handleSync = () =>{
        let self = this;
        self.setState({
            loading: true,
        }); 
        let object = {
            actionType: SyncActionType.SyncIncomingOrReturn,
            success:function () {
                self.setState({
                    loading: false,
                }); 
                NoticeUtils.showSuccess();
            }
        }
        SyncIncomingOrReturnMLotRequest.sendSyncIncomingOrReturnRequest(object);
    }

    handleUpload = (option) => {
        const self = this;
        let fileName = option.file.name;
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        let object = {
            fileName: fileName,
            importTypeNbTable : "IncomingMLotImport",
            success: function(responseBody) {
                let materialLotList = responseBody.dataList;
                self.setState({
                    data: materialLotList,
                    loading: false
                });           
            }
        }
        IncomingMaterialImportRequest.sendSelectRequest(object, option.file);
    }
    
    SaveButton = () => {
        const {data,table} = this.state;
        let self = this;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        let requestObject = {
            dataList: data,
            success: function(responseBody) {
                self.setState({
                    data: [],
                    loading: false
                });
                Notification.showNotice(I18NUtils.getClientMessage(i18NCode.OperationSucceed));
            }
        }
        IncomingMaterialImportRequest.sendImportRequest(requestObject);
    }
 
    deleteAllMaterialLot = () => {
        let self = this;
        if( self.state.data.length == 0){
            return;
        } else {
            self.props.resetData();
        }
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};