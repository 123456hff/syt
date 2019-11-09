var bus = new Vue()

Vue.component('Tab', {
    template: '#tab',
    methods: {
        input_change() {

            bus.$emit('input_flag_change')
        }
    }

});

Vue.component('Container', {
    template: '#container',
    data() {
        return {
            input_flag: false
        }
    },
    props: ['todos', 'type'],
   

    methods: {
        aa(index) {
            this.$emit('bb', index)
        },


        checkDone(index) {
            this.$emit('cc', index)
        },
        add(e) {
            this.$emit('add_item', e.target.value)
        }
    },
    mounted() {
        var that = this
        bus.$on('input_flag_change', function() {
            that.input_flag = !that.input_flag
        })
    },


});
Vue.component('MyMask', {
    template: '#mask',
    props: ['remove_mask', 'remove'],
    methods: {
        confirm() {
            this.remove_mask()
            this.remove(this_index)
        }
    }
});
Vue.component('Tabbar', {
    template: '#tabbar',
    props: ['type'],
    type: 'A',
    data() {
        return {
            tabbars: [{
                    id: 1,
                    text: 'A',
                    class: 'circle-success'
                },
                {
                    id: 2,
                    text: 'F',
                    class: 'circle-primary'
                },
                {
                    id: 3,
                    text: 'U',
                    class: 'circle-danger'
                }
            ]
        }
    },
methods:{
changeType(val){


this.$emit('get_type',val)
}
}
});

new Vue({
        el: '#app',
        data: {
            maskt: false,
            active_index: 0,
            type:'A',
            todos: [{
                    id: 1,
                    task: '斗者',
                    done: true

                },
                {
                    id: 2,
                    task: '斗师',
                    done: false

                }
            ]
        },
      
        methods: {

            changeFlag(index) {



                this.todos[index].done = !this.todos[index].done
            },



            check(index) {
                const flag = this.todos[index].done
                if (flag) {
                    this.remove(index)

                } else {
                    this.checkMask()
                    this_index = index
                }
            },
            remove(index) {
                this.todos.splice(index, 1)
            },
            checkMask() {
                this.maskt = true
            },
            removeMask() {
                this.maskt = false
            },
            addItem(val) {
                this.todos.push({
                    id: sort(this.todos)[0].id + 1,
                    task: val,
                    done: true
                })
            },
            changeType ( val ) {
                this.type = val 
              }


        },

        computed: {
            newTodos () {
              switch ( this.type ) {
                case 'A':
                  return this.todos 
                  break;
                case 'F':
                  return this.todos.filter( item => item.done ) 
                  break;
                case 'U':
                  return this.todos.filter( item => !item.done ) 
                  break;
              
                default:
                  break;
              }
            }
          }

    })
   
function sort(arr) {
    return arr.sort(function(a, b) {
        return b.id - a.id
    })
}