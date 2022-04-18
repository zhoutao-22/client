import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd';
import './QueryForm.scss';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import Field from '@api/dto/ui/Field';
import * as PropTypes from 'prop-types';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import SqlUtils from '@components/framework/utils/SqlUtils';

/**
 * 不展开的时候最大的查询数目
 */
const unExpendMaxSize = 6;

class QueryForm extends React.Component {
    static displayName = 'QueryForm';

    constructor(props) {
        super(props);
        let tableRrn = this.props.tableRrn;
        this.state = {
            expand: false,
            tableRrn: tableRrn,
            queryFields: []
        };
    }

    componentDidMount() {
        this.getQueryFields(this.state.tableRrn);
    }

    getQueryFields = (tableRrn) => {
        let self = this;
        let requestObject = {
            tableRrn: tableRrn,
            success: function(responseBody) {
                let fields = responseBody.table.fields;
                let queryFields = [];
                for (let field of fields) {
                    let f = new Field(field, self.props.form);
                    if (f.isQueryField()) {
                        queryFields.push(f);
                    }
                }
                self.setState({queryFields: queryFields})
            }
        }
        TableManagerRequest.sendGetByRrnRequest(requestObject);
    }  

    getFields(queryFields) {
        const count = this.state.expand ? queryFields.length : unExpendMaxSize;
        const children = [];
        let i = 0;
        queryFields.forEach((field) => {
            children.push(
                <Col span={8} key={field.name} style={{ display: i < count ? 'block' : 'none' }}>
                    {field.buildFormItem(undefined, false, true)}
                </Col>,
            );
            i++;
        });
        return children;
    }

    handleSearch = e => {
        if(e){
            e.preventDefault();
        }
        var self = this;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let whereClause = SqlUtils.buildWhereClause(this.state.queryFields, values);
            if (self.props.onSearch) {
                self.props.onSearch(whereClause);
            } 
        });
    };

    handleReset = () => {
        if (this.props.handleReset) {
            this.props.handleReset();
        }
        this.resetFormFileds();
    };

    resetFormFileds() {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    render() {
        const queryFields = this.state.queryFields;
        const searchTxt = this.props.searchTxt || I18NUtils.getClientMessage(i18NCode.BtnSearch);
        const showButton = this.props.showButton; 
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>{this.getFields(queryFields)}</Row>
                {queryFields.length > 0 && showButton? 
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button icon={<SearchOutlined />} type="primary" htmlType="submit">{searchTxt}</Button>
                            <Button icon={<RedoOutlined />} style={{ marginLeft: 8 }} onClick={this.handleReset}>{I18NUtils.getClientMessage(i18NCode.BtnReset)}</Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                {I18NUtils.getClientMessage(i18NCode.Collapse)}<LegacyIcon type={this.state.expand ? 'up' : 'down'} />
                            </a>
                        </Col>
                    </Row> : ""}
            </Form>
        );
    }
}

QueryForm.prototypes = {
    tableRrn: PropTypes.number.isRequired,
    searchlTxt: PropTypes.string,
    showButton: PropTypes.bool
}

const WrappedAdvancedQueryForm = Form.create()(QueryForm);
export default WrappedAdvancedQueryForm;