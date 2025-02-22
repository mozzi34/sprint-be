import axios from 'axios';

const instance = axios.create({
  baseURL: `https://sprint-mission-api.vercel.app`,
});

export async function getProductList(params = {}) {
  const { page = 1, pageSize = 10, keyword = '' } = params;
  try {
    const { data } = await instance.get(`/products`, {
      params,
    });
    return data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('Product List: 데이터 불러오기에 실패했습니다');
    }
  }
}

export async function getProduct(productId) {
  try {
    const { data } = await instance.get(`/products/${productId}`);
    return data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('Get product with ID: 데이터 불러오기에 실패했습니다');
    }
  }
}

export async function createProduct(updateData) {
  try {
    const { data } = await instance.post(`/products`, updateData);
    return data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('Created product: 데이터 불러오기에 실패했습니다');
    }
  }
}

export async function patchProduct(productId, updateData) {
  try {
    const { data } = await instance.patch(`/products/${productId}`, updateData);
    return data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('Patched product with ID: 데이터 불러오기에 실패했습니다');
    }
  }
}

export async function deleteProduct(id) {
  try {
    const { data } = await instance.delete(`/products/${id}`);
    return true;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('Deleted product with ID: 데이터 불러오기에 실패했습니다');
    }
  }
}
