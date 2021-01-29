import Components from "@dynamic-form/views/Common/ComponentsJson"
import FormItem from "@dynamic-form/views/Common/ComponentsJson/FormItem"

function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}

export class FormJsonFactory {
  constructor(){
    if(this.inst) {
      return this.inst
    } else {
      this.convertComponentJsonArrayToObject()
      this.inst = this
      return this
    }
  }
  
  convertComponentJsonArrayToObject(){
    this.ComponentsObject = {}
    Components.forEach(v => {
      this.ComponentsObject[v.name] = v
    })
  }

  getformItemModels(){
    return FormItem.props.element.map(v=>{
      return {
        name:v.name,
        value:v.value
      }
    })
  }

  getFormItemJson(componentName) {
    let componentJson = this.getComponentJson(componentName)
    return {
      componentJson,
      formItemJson:FormItem,
      tag:componentJson.tag,
      name: componentJson.name,
      children: componentJson.categories === "布局容器" ? this.initContainerChildren(componentJson) : null,
      id:uuid(),
      formItemModels:componentJson.categories === "表单控件" ? this.getformItemModels() : null,
      componentModels:componentJson.props.element.map(v=>{
        return {
          name:v.name,
          value:v.value
        }
      })
    }
  }

  initContainerChildren(){
    return [{
      tag:'el-col',
      id:uuid(),
      span:12,
      children:[]
    },{
      tag:'el-col',
      id:uuid(),
      span:12,
      children:[]
    }]
  }

  getComponentJson(componentName){
    return this.ComponentsObject[componentName]
  }
}

export class ParseJsonToForm {
  constructor(){

  }
}
 