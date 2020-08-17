import GcPrintWltCpLotTable from "../../../components/Table/gc/GcPrintWltCpLotTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GetPrintWltCpRequest from '../../../api/gc/get-print-wltcp-parameter/GetPrintWltCpRequest';

const rowKey = "packedLotRrn";

export default class GCPrintWltCpLotProperties extends EntityScanProperties{

    static displayName = 'GCPrintWltCpLotProperties';

    constructor(props) {
        super(props);
        this.state= {...this.state,...{rowKey:rowKey}}
    }
    
    /**
     * 当表格里数据做完操作之后，务必调用下此方法把扫描添加进去的state数据清零。不然会把上一次的扫描结果一起带到下一次中去
     */
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <GcPrintWltCpLotTable pagination={false} rowKey={this.state.rowKey} 
                                        selectedRowKeys={this.state.selectedRowKeys} 
                                        selectedRows={this.state.selectedRows} 
                                        table={this.state.table} 
                                        data={this.state.tableData} 
                                        loading={this.state.loading} 
                                        resetData={this.resetData.bind(this)}
                                        resetFlag={this.state.resetFlag}/>
    }

}