<template>
  <div class='askk'>
  <div>
    
  <!-- <b-tabs
    active-nav-item-class="font-weight-bold text-uppercase text-danger"
    active-tab-class="font-weight-bold text-success"
    content-class="mt-3"
    align='center'
  > -->
    <!-- <b-tab title="Tags" active> -->
      <b-form-group label="Choose Tags :">
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="tags"
        :options="options"
        name="flavour-1"
      ></b-form-checkbox-group>
      <div>
        <form v-if='customTag' @submit.prevent='toArray'>
        <input type='text' placeholder="custom tag" v-model='customtags'>
        <input type='submit' class="btn-outline-success btn btn-md" v-if='customTag' value='add tag'>
        </form>
      </div>
      <button class="btn-outline-success btn btn-md" v-if='!customTag' @click='customTagClick'>Custom Tag</button>
      </b-form-group>
    <!-- </b-tab> -->
    <!-- <b-tab title='Title'> -->
      <b-form-group
      id="fieldset-1"
      description="Let us know your title."
      label="Enter your title"
      label-for="input-1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
      >
      <b-form-input id="input-1" v-model="titles" :state="state" trim></b-form-input>
      </b-form-group>
    <!-- </b-tab> -->
    <!-- <b-tab title="Description"> -->
      <p>
      <vue-editor v-model='question'></vue-editor>
      </p>
      <b-col  align='center'>
      <b-button size='md' variant='primary' @click='sendQuestion()'>Create Question</b-button>
      </b-col>
    <!-- </b-tab> -->
  <!-- </b-tabs> -->
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    titles: '',
    question: '',
    customTag: false,
    customtags: null,
    tags: [],
    options: [
      { value: 'javascript', text: 'Javascript' },
      { value: 'c++', text: 'C++' },
      { value: 'vuex', text: 'Vuex' },
      { value: 'nodejs', text: 'nodejs'},
      { value: 'xcode', text: 'xcode'},
      { value: 'python', text: 'phyton'},
      { value: 'java', text: 'java'},
      { value: 'vue-cli', text: 'vue-cli'},
      { value: 'mongoose', text: 'mongoose'},
    ]
    }
  },
  methods: {
  toArray () {
    this.options.push({ value: this.customtags, text: this.customtags })
    this.customtags = null
  },
  customTagClick () {
    this.customTag = true;
  },
  sendQuestion () {
    const payload ={ 
    title: this.titles,
    question: this.question,
    tags: this.tags
    }
    this.$store
    .dispatch('sendQuestion', payload)
    .then(send => {
      this.$awn.success(send.msg)
      this.$router.push('/')
    })
    .catch(err => {
      this.$awn.warning(err.response.data.msg+' please Login First')
      this.$router.push('/login')
    })
  }
  },
  computed: {
    state() {
    return this.titles.length >= 6 ? true : false
    },
    invalidFeedback() {
    if (this.titles.length > 6) {
      return ''
    } else if (this.titles.length > 0) {
      return 'Enter at least 6 characters'
    } else {
      return 'Need Title'
    }
    },
    validFeedback() {
    return this.state === true ? 'Good Title' : ''
    }
  },
}
</script>

<style>
.askk {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px
}
</style>