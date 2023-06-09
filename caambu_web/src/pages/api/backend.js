import axios from 'axios';
import { useState } from 'react';

const api = axios.create({
    baseURL:"http://127.0.0.1:8000/caambu/api/v1/",
})

axios.defaults.headers["Access-Control-Allow-Origin"] = "*"

//Benefactores
export const getAllBenefactor = () => api.get('benefactor/');

export const getBenefactor = (id) => api.get(`benefactor/${id}/`);

export const createBenefactor= (benefactor) => api.post('benefactor/', benefactor,  {headers: {
    "Content-Type": "application/json",
  }});

export const deleteBenefactor= (id) => api.delete(`benefactor/${id}/`);

export const updateBenefactor= (id, benefactor) => api.put(`benefactor/${id}/`, benefactor);


//Instituciones
export const getAllInstitucion = () => api.get('institucionasilo/', {headers: {
  "Content-Type": "application/json"}});

export const getInstitucionById = (id) => api.get(`institucionasilo/${id}/`);

export const createInstitucion= (institucion) => api.post('institucionasilo/', institucion,  {headers: {
    "Content-Type": "application/json",
  }});

export const deleteInstitucion= (id) => api.delete(`institucionasilo/${id}/`);

export const updateInstitucion= (id, institucion) => api.put(`institucionasilo/${id}/`, institucion);


//Campania

export const getAllCampania = () => api.get('campania/');

export const getCampaniaById = (id) => api.get(`campania/${id}/`);

export const createCampania= (campania) => api.post('campania/', campania,  {headers: {
    "Content-Type": "application/json",
  }});

export const deleteCampania= (id) => api.delete(`campania/${id}/`);

export const updateCampania= (id, campania) => api.put(`campania/${id}/`, campania);


//Donaciones

export const getAllDonacion = () => api.get('donacion/');

export const getDonacionById = (id) => api.get(`donacion/${id}/`);

export const updateDonacion= (id, donacion) => api.put(`donacion/${id}/`, donacion);

//Recoger

export const getAllAcopios = () => api.get('recojosprogramados/');

export const getAcopiosById = (id) => api.get(`recojosprogramados/${id}/`);
