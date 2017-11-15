/**
 * Created by xiaoyao on 17-11-13.
 */


import request from "../utils/request";
import qs from "qs";

export async function getDirectory(options) {
  return request(`/api/directory/list?${qs.stringify(options)}`);
}

export async function getStudyDirectory(options) {
  return request('/api/study_directory');
}
