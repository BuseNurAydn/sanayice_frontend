const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const DASHBOARD_API = `${API_BASE}/seller/dashboard`;

const getToken = () => localStorage.getItem("token");

//GET İSTATİSLİK
export const fetchDashboardStats = async (): Promise<any> => {
  const token = getToken();
  const response = await fetch(`${DASHBOARD_API}/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('İstatistikler alınamadı');
  }
  return await response.json();
};

//GET- SON 3 SİPARİŞ
export const fetchRecentOrders = async (): Promise<any> => {
  const token = getToken();
  const response = await fetch(`${DASHBOARD_API}/recent-orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Son siparişler alınamadı.");
  }
  return await response.json();
};

//GET- POPÜLER ÜRÜNLER
export const fetchPopulerProducts = async (): Promise<any> => {
  const token = getToken();
  const response = await fetch(`${DASHBOARD_API}/popular-products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Popüler ürünler alınamadı.");
  }
  return await response.json();
};

