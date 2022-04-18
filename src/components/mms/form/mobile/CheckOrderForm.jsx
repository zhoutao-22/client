import MobileForm from "@components/framework/form/MobileForm";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

export default class CheckOrderForm extends MobileForm {
    static displayName = 'CheckOrderForm';

    afterQuery = (responseBody) => {
        let showData = [];
        if(this.props.dataTable){
            if(responseBody.dataList){
                showData = responseBody.dataList;
            }
            this.props.dataTable.setState({
                data: showData,
            })
        }
    }

}
const WrappedCheckOrderForm = Form.create()(CheckOrderForm);
export {WrappedCheckOrderForm};

 