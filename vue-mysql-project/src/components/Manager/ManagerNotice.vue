<template>
<div>
    <h2>通知</h2>
    <collapse>
      <div slot="trigger">发布新通知</div>
      <div slot='content'>
         <el-form ref="form" v-bind:model="addform" label-width="100px"  >
            <el-form-item label="标题" prop="newtitle">
                <el-input v-model="addform.newtitle"></el-input>
            </el-form-item>

            <el-form-item label="内容" prop="newcontent">
                <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="addform.newcontent">
              </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addNotice()">发布新通知</el-button>
            </el-form-item>
        </el-form>
      </div>
    </collapse>
  <el-table
    :data="GetNotice"
  >
     <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="通知内容">
            <span>{{ props.row.content }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  
    <el-table-column
      label="通知"
      prop="title"
     >
    </el-table-column>

    <el-table-column
      label="日期"
      prop="date"
      >
    </el-table-column>

    <el-table-column
    >
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="deleteNotice(scope.$index, scope.row)">删除该通知</el-button>
          </template>
    </el-table-column>
  </el-table>
  
</div>
  
</template>

<style>
  div{
    width: 95%;
    margin:0;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import api from '../../axios.js'
import collapse from '../common/collapse'

  export default {
    data() {
      return {
        addform: {
          newtitle:'',
          newcontent:''
        }
        
      }
    },
     
    computed:{
      GetNotice()
      {
        return this.$store.state.notice;
      }
    },
    mounted:function(){
        this.$store.commit('CLEARNOTICE');
         api.GetNotice().then((response)=>{  
          console.log(response.date);      
            for(let i=0;i<response.data.length;i++)
            {
               let date=new Date(response.data[i].date);
               response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
              this.$store.commit('ADDNOTICE',response.data[i]);
              
            }                       
           },(reject)=>{
              console.log('get fail')
           })
    },
    methods:{
      deleteNotice(index,row)
      {
        // console.log('    '+row.id);
          this.$store.commit('DELETENOTICE',index);

          api.deleteNotice({
            id:row.id
          }).then();
      },
      addNotice()
      {
        api.insertNotice({
            title:this.$data.addform.newtitle,
            content:this.$data.addform.newcontent
        }).then((response)=>{
                        
           },(reject)=>{
              console.log('get fail')
           })

         this.$store.commit('ADDNOTICE',{'content':this.$data.addform.newcontent,'title':this.$data.addform.newtitle,'date':new Date().toLocaleDateString()});
       
      }
    },
    components:{
      collapse
    }
  }
</script>
<style scoped>
div{
  text-align:left;
}
</style>
