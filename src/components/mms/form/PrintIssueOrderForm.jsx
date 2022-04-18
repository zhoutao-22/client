import  React from 'react';
import EntityForm from '@components/framework/form/EntityForm';
import SimpleBarCode from '@components/framework/code/SimpleBarCode';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

/**
 * 打印发料单
 */
class PrintIssueOrderForm extends EntityForm {

    static displayName = 'PrintIssueOrderForm';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    buildForm = () => {
       return this.buildPrintTable();
    }

    forEachBuildTr = (materialLots) =>{
        let trArr = [];
        materialLots.forEach(mLot => {
            let tr = this.buildTr(mLot);
            trArr.push(tr);
        });
        return trArr;
    }

    buildTr = (mLot) => {
        return(<tr>
            <th colspan = "2" style={styles.tdFontSize}>{mLot.lastStorageId}</th> 
            <th colspan = "2" style={styles.tdFontSize}>{mLot.materialLotId}</th> 
            <th colspan = "2" style={styles.tdFontSize}>{mLot.materialName}</th> 
            <th colspan = "2" style={styles.tdFontSize}>{mLot.currentQty}</th> 
            <th colspan = "2" style={styles.tdFontSize}>{mLot.reservedQty == 0 ? mLot.pickQty : mLot.reservedQty}</th> 
            <th colspan = "2" style={styles.tdFontSize}>{mLot.reserved14}</th>
        </tr>)
            
    }

    buildBarCode = (value) => {
        return (
            <div id="barcode">
                <SimpleBarCode value={value}></SimpleBarCode>
            </div>)
    }

    buildPrintTable = () => {
        let materialLots = this.props.object;
        let document = this.props.document;
        let costCenter = this.props.costCenter;
        let trArr = this.forEachBuildTr(materialLots);
        return (<div id="printTable">
                    <table border="0" width="100%" cellspacing="0">
                        <tbody>
                            <tr>
                                <th colspan = "8"><h2>发料单</h2></th> 
                            </tr>                           
                            <tr>
                                <th colspan = "4" style={styles.tdFontSize}>单号:{this.buildBarCode(document.name)}</th>
                                
                                <th colspan = "4">成本中心:{costCenter}</th> 
                            </tr>
                        </tbody>
                    </table>

                    <table border="1" width="100%" cellspacing="0">
                        <tbody>
                            <tr>
                                <th colspan = "2" style={styles.tdFontSize}>库位号</th> 
                                <th colspan = "2" style={styles.tdFontSize}>物料批次号</th> 
                                <th colspan = "2" style={styles.tdFontSize}>物料代码</th> 
                                <th colspan = "2" style={styles.tdFontSize}>数量</th>
                                <th colspan = "2" style={styles.tdFontSize}>领料数量</th>
                                <th colspan = "2" style={styles.tdFontSize}>备注</th>
                            </tr>
                            {trArr}
                        </tbody>
                    </table>

                    <table border="0" width="100%">
                            <tr><td colspan="2">&nbsp;</td></tr>
                            <tr>
                                <td style={styles.tdFontSize}>制单人:{document.createdBy}</td>
                                <td style={styles.tdFontSize}>审核人:</td>
                                <td style={styles.tdFontSize}>领料人:</td>
                                <td style={styles.tdFontSize}>发料人:</td>
                            </tr>                    
                        </table>
                </div>
        )}
}
const styles = {
    tdFontSize:{fontSize:'12px', height:'30px'}
}
export default Form.create()(PrintIssueOrderForm);