<template>
  <div>
    This is a team that is dedicated to music.
  </div>
</template>

<style scoped>
    /*
 * Define the widths: play around with these
 * to get a best fit.
 */
/*
 * Basic styles, good for a large display. Everything fits in
 * one row, no wrapping. All text based cells grow equally.
 */
.table-row {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  flex-wrap: no-wrap;
  -webkit-flex-wrap: no-wrap;
  width: 800px;
  padding-left: 15px;
  padding-right: 15px;
}
.wrapper {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
}
.column {
  flex-grow: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-flex-grow: 0;
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
  vertical-align: top;
}

.module {
  width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.reporter {
  width: 85px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  font-weight: bold;
  color: #337ab5;
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comment {
  width: 120px;
}
.title,
.comment {
  flex-grow: 1;
  -webkit-flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 4px;
}
/* growable wrappers */
.title-comment,
.title-comment-module-reporter,
.attributes {
  flex-grow: 1;
  -webkit-flex-grow: 1;
}

</style>
