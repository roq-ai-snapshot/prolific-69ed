import axios from 'axios';
import queryString from 'query-string';
import { MentorshipPurchaseInterface, MentorshipPurchaseGetQueryInterface } from 'interfaces/mentorship-purchase';
import { GetQueryInterface } from '../../interfaces';

export const getMentorshipPurchases = async (query?: MentorshipPurchaseGetQueryInterface) => {
  const response = await axios.get(`/api/mentorship-purchases${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMentorshipPurchase = async (mentorshipPurchase: MentorshipPurchaseInterface) => {
  const response = await axios.post('/api/mentorship-purchases', mentorshipPurchase);
  return response.data;
};

export const updateMentorshipPurchaseById = async (id: string, mentorshipPurchase: MentorshipPurchaseInterface) => {
  const response = await axios.put(`/api/mentorship-purchases/${id}`, mentorshipPurchase);
  return response.data;
};

export const getMentorshipPurchaseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/mentorship-purchases/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMentorshipPurchaseById = async (id: string) => {
  const response = await axios.delete(`/api/mentorship-purchases/${id}`);
  return response.data;
};
