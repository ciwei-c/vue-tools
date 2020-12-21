export default {
  data(){
    return {
      scale:'auto',
      maxScale:3,
      minScale:0.5,
      currentPage:1,
      spreadMode:{
        UNKNOWN: -1,
        NONE: 0, // Default value.
        ODD: 1,
        EVEN: 2,
      }
    }
  }
}