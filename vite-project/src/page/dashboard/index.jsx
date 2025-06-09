import React, { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { BiCart, BiDollar, BiGroup, BiDotsVertical } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import ApexCharts from "apexcharts";
import { get } from "../../utils/axios-http/axios-http";

const Dashboard = () => {
  const reportsChartRef = useRef(null);
  const trafficChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Đơn hàng
  const [orderPeriod, setOrderPeriod] = useState("daily");
  const [orderCount, setOrderCount] = useState(0);
  const [percentageChangeOrder, setPercentageChangeOrder] = useState(0);

  // Doanh số
  const [revenuePeriod, setRevenuePeriod] = useState("monthly");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [percentageChangeRevenue, setPercentageChangeRevenue] = useState(0);

  // Người dùng
  const [customerPeriod, setCustomerPeriod] = useState("monthly");
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [percentageChangeCustomer, setPercentageChangeCustomer] = useState(0);

  // Bán chạy
  const [topSellingPeriod, setTopSellingPeriod] = useState("monthly");
  const [topSelling, setTopSelling] = useState([]);

  const [orderChartPeriod, setOrderChartPeriod] = useState("daily");
  const [customerChartPeriod, setCustomerChartPeriod] = useState("daily");

  const [orderChartGranularity, setOrderChartGranularity] = useState("day");
  const [customerChartGranularity, setCustomerChartGranularity] =
    useState("day");

  const [loading, setLoading] = useState(false);

  const fetchOrderStats = async (granularity = "day", period = "daily") => {
    setOrderPeriod(period);
    try {
      const res = await get(
        `statistics/rental-orders?granularity=${granularity}&period=${period}`
      );
      const stats = res.data?.stats.reverse() || [];

      setOrderCount(stats[0].orderCount.count);
      setPercentageChangeOrder(stats[0].orderCount.percentageChange);
    } catch (error) {
      message.error("Không thể lấy dữ liệu đơn hàng");
    }
  };

  const fetchRevenueStats = async (
    granularity = "month",
    period = "monthly"
  ) => {
    setRevenuePeriod(period);
    try {
      const res = await get(
        `statistics/rental-orders?granularity=${granularity}&period=${period}`
      );
      const stats = res.data?.stats.reverse() || [];

      setTotalRevenue(stats[0].totalRevenue.amount);
      setPercentageChangeRevenue(stats[0].totalRevenue.percentageChange);
    } catch (error) {
      message.error("Không thể lấy dữ liệu doanh số");
    }
  };

  const fetchCustomerStats = async (
    granularity = "month",
    period = "monthly"
  ) => {
    setCustomerPeriod(period);
    try {
      const res = await get(
        `statistics/customers?granularity=${granularity}&period=${period}`
      );
      const stats = res.data?.stats.reverse() || [];

      setTotalCustomer(stats[0].count);
      setPercentageChangeCustomer(stats[0].percentageChange);
    } catch (error) {
      message.error("Không thể lấy dữ liệu doanh số");
    }
  };

  const fetchTopSellingStats = async (period = "monthly") => {
    setTopSellingPeriod(period);
    try {
      const res = await get(`statistics/cars?period=${period}`);
      const stats = res.data?.carRentalMostList || [];

      setTopSelling(stats);
    } catch (error) {
      message.error("Không thể lấy dữ liệu");
    }
  };

  useEffect(() => {
    fetchOrderStats();
    fetchRevenueStats();
    fetchCustomerStats();
    fetchTopSellingStats();
  }, []);

  const getLabel = (period) => {
    switch (period) {
      case "daily":
        return "Hôm nay";
      case "monthly":
        return "Tháng này";
      case "yearly":
        return "Năm nay";
      default:
        return "";
    }
  };

  const fetchReportsChartData = async (
    orderChartPeriod = "daily",
    orderChartGranularity = "hour",
    customerChartPeriod = "daily",
    customerChartGranularity = "hour"
  ) => {
    try {
      // 1. Huỷ chart cũ nếu có
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // 2. Gọi API song song
      const [rentalRes, custRes] = await Promise.all([
        get(
          `statistics/rental-orders?granularity=${orderChartGranularity}&period=${orderChartPeriod}`
        ),
        get(
          `statistics/customers?granularity=${customerChartGranularity}&period=${customerChartPeriod}`
        ),
      ]);

      const rentalStats = rentalRes.data.stats;
      const custStats = custRes.data.stats;

      // 3. Tạo map lookup từ custStats
      const custMap = new Map(custStats.map((c) => [c.period, c.count]));

      // 4. Dùng period từ rentalStats làm gốc
      const categories = rentalStats.map((s) =>
        new Date(s.period.replace(" ", "T") + ":00:00Z").toISOString()
      );

      const series = [
        {
          name: "Đơn thuê",
          type: "line",
          data: rentalStats.map((s) => s.orderCount.count),
        },
        {
          name: "Doanh số",
          type: "area",
          data: rentalStats.map((s) => s.totalRevenue.amount),
        },
        {
          name: "Người dùng",
          type: "line",
          data: rentalStats.map((s) => custMap.get(s.period) ?? 0),
        },
      ];

      // 5. Cấu hình biểu đồ với y-axis riêng để dễ nhìn
      const options = {
        series,
        chart: {
          height: 400,
          type: "line",
          stacked: false,
          toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: { width: [2, 2, 2], curve: "smooth" },
        xaxis: {
          type: "datetime",
          categories,
          title: { text: "Thời gian" },
        },
        yaxis: [
          {
            seriesName: "Đơn thuê",
            title: { text: "Đơn thuê" },
            labels: { style: { color: "#4154f1" } },
          },
          {
            opposite: true,
            seriesName: "Doanh số",
            title: { text: "Doanh số (VNĐ)" },
            labels: { style: { color: "#2eca6a" } },
          },
          {
            opposite: true,
            seriesName: "Người dùng",
            title: { text: "Người dùng" },
            labels: { style: { color: "#ff771d" } },
          },
        ],
        colors: ["#4154f1", "#2eca6a", "#ff771d"],
        tooltip: {
          shared: true,
          x: { format: "dd/MM/yy HH:mm" },
        },
      };

      // 6. Render
      chartInstanceRef.current = new ApexCharts(
        reportsChartRef.current,
        options
      );
      chartInstanceRef.current.render();
    } catch (err) {
      console.error("Lỗi load reports chart:", err);
    }
  };

  useEffect(() => {
    fetchReportsChartData();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [orderChartPeriod, customerChartPeriod]);

  useEffect(() => {
    const fetchOverviewChart = async () => {
      try {
        const res = await get(`statistics/overview`);
        const data = res.data;

        const chartOptions = {
          chart: {
            type: "pie",
            height: 350,
          },
          labels: ["Đơn chờ xử lý", "Đơn đã hoàn thành"],
          series: [data.pendingOrders, data.completedOrders],
          tooltip: {
            y: {
              formatter: (val) => `${val.toLocaleString("vi-VN")} đơn`,
            },
          },
          legend: {
            top: "5%",
            left: "center",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        };

        if (trafficChartRef.current) {
          const trafficChart = new ApexCharts(
            trafficChartRef.current,
            chartOptions
          );
          trafficChart.render();

          return () => {
            trafficChart.destroy();
          };
        }
      } catch (error) {
        message.error("Không thể lấy dữ liệu tổng quan");
      }
    };

    fetchOverviewChart();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Dashboarddd</li>
          </ol>
        </nav>
      </div>

      <section className="section dashboard">
        <div className="row">
          {/* Left side columns */}
          <div className="col-lg-8">
            <div className="row">
              {/* Rental Order Card */}
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown">
                      <BiDotsVertical />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Lọc</h6>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchOrderStats("day", "daily")}
                        >
                          Ngày
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchOrderStats("month", "monthly")}
                        >
                          Tháng
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchOrderStats("year", "yearly")}
                        >
                          Năm
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Đơn thuê <span>| {getLabel(orderPeriod)}</span>
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <BiCart />
                      </div>
                      <div className="ps-3">
                        <h6>
                          {orderCount.toLocaleString("vi-VN", {
                            maximumFractionDigits: 0,
                          })}{" "}
                          đơn
                        </h6>
                        <span
                          className={`small pt-1 fw-bold ${
                            percentageChangeOrder >= 0
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {Math.abs(percentageChangeOrder)}%
                        </span>
                        <span className="text-muted small pt-2 ps-1">
                          {percentageChangeOrder >= 0 ? "tăng" : "giảm"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Card */}
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card revenue-card">
                  <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown">
                      <BiDotsVertical />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Lọc</h6>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchReportsChartData("day", "daily")}
                        >
                          Ngày
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            fetchReportsChartData("month", "monthly")
                          }
                        >
                          Tháng
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            fetchReportsChartData("year", "yearly")
                          }
                        >
                          Năm
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Doanh số <span>| {getLabel(revenuePeriod)}</span>
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <BiDollar />
                      </div>
                      <div className="ps-3">
                        <h6>
                          {totalRevenue.toLocaleString("vi-VN", {
                            maximumFractionDigits: 0,
                          })}{" "}
                          đ
                        </h6>
                        <span
                          className={`small pt-1 fw-bold ${
                            percentageChangeRevenue >= 0
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {Math.abs(percentageChangeRevenue)}%
                        </span>
                        <span className="text-muted small pt-2 ps-1">
                          {percentageChangeRevenue >= 0 ? "tăng" : "giảm"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customers Card */}
              <div className="col-xxl-4 col-xl-12">
                <div className="card info-card customers-card">
                  <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown">
                      <BiDotsVertical />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Lọc</h6>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchCustomerStats("day", "daily")}
                        >
                          Ngày
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchCustomerStats("month", "monthly")}
                        >
                          Tháng
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchCustomerStats("year", "yearly")}
                        >
                          Năm
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Người dùng <span>| {getLabel(customerPeriod)}</span>
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <BiGroup />
                      </div>
                      <div className="ps-3">
                        <h6>{totalCustomer}</h6>
                        <span
                          className={`small pt-1 fw-bold ${
                            percentageChangeCustomer >= 0
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {Math.abs(percentageChangeCustomer)}%
                        </span>
                        <span className="text-muted small pt-2 ps-1">
                          {percentageChangeCustomer >= 0 ? "tăng" : "giảm"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reports */}
              <div className="col-12">
                <div className="card">
                  <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown">
                      <BiDotsVertical />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Lọc</h6>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            fetchReportsChartData(
                              "daily",
                              "hour",
                              "daily",
                              "hour"
                            )
                          }
                        >
                          Ngày
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            fetchReportsChartData(
                              "monthly",
                              "day",
                              "monthly",
                              "day"
                            )
                          }
                        >
                          Tháng
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            fetchReportsChartData(
                              "yearly",
                              "day",
                              "yearly",
                              "day"
                            )
                          }
                        >
                          Năm
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Báo cáo <span>/ Hôm nay</span>
                    </h5>
                    <div id="reportsChart" ref={reportsChartRef}></div>
                  </div>
                </div>
              </div>

              {/* Top Selling */}
              <div className="col-12">
                <div className="card top-selling overflow-auto">
                  <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown">
                      <BiDotsVertical />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li className="dropdown-header text-start">
                        <h6>Lọc</h6>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchTopSellingStats("daily")}
                        >
                          Ngày
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchTopSellingStats("monthly")}
                        >
                          Tháng
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => fetchTopSellingStats("yearly")}
                        >
                          Năm
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body pb-0">
                    <h5 className="card-title">
                      Top bán chạy <span>| {getLabel(topSellingPeriod)}</span>
                    </h5>
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">Ảnh</th>
                          <th scope="col">Xe</th>
                          <th scope="col">Lượt thuê</th>
                          <th scope="col">Doanh thu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topSelling.map((car, index) => (
                          <tr key={car.carId}>
                            <td>
                              <img
                                src={car.carImage}
                                alt={car.carModelName}
                                style={{
                                  width: "150px",
                                  borderRadius: "8px",
                                  maxWidth: "none",
                                }}
                              />
                            </td>
                            <td>
                              <span className="text-primary fw-bold">
                                {car.carModelName}
                              </span>
                            </td>
                            <td className="fw-bold">{car.rentalCount}</td>
                            <td>
                              {car.totalRevenue.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side columns */}
          <div className="col-lg-4">
            {/* Recent Activity */}
            <div className="card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                  <BiDotsVertical />
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Lọc</h6>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Ngày
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Tháng
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Năm
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  Hoạt động gần đây<span> | Hôm nay</span>
                </h5>
                <div className="activity">
                  <div className="activity-item d-flex">
                    <div className="activite-label">32 min</div>
                    <FaCircle className="activity-badge text-success align-self-start" />
                    <div className="activity-content">
                      Thừa Văn An mới có buổi nói chuyển với anh{" "}
                      <a href="#" className="fw-bold text-dark">
                        CR7
                      </a>{" "}
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">56 min</div>
                    <FaCircle className="activity-badge text-danger align-self-start" />
                    <div className="activity-content">
                      Phạm Đình Danh đã đặt thuê chiệc VF5 một năm
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">2 hrs</div>
                    <FaCircle className="activity-badge text-primary align-self-start" />
                    <div className="activity-content">
                      Nguyễn Văn Chiến vửa cập nhật thông tin xe VF8
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">1 day</div>
                    <FaCircle className="activity-badge text-info align-self-start" />
                    <div className="activity-content">
                      Thừa Văn An mới trở thành{" "}
                      <a href="#" className="fw-bold text-dark">
                        tỷ phú
                      </a>{" "}
                      hahaha :))
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">2 days</div>
                    <FaCircle className="activity-badge text-warning align-self-start" />
                    <div className="activity-content">
                      Trần Hồng Quân mới xóa duyệt đơn thuê xe mớimới
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">4 weeks</div>
                    <FaCircle className="activity-badge text-muted align-self-start" />
                    <div className="activity-content">
                      Nguyễn Văn Chiến đã cập nhật ảnh xe VF7
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                  <BiDotsVertical />
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Lọc</h6>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Ngày
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Tháng
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Năm
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body pb-0">
                <h5 className="card-title">
                  Tổng quan hệ thống <span>| Hôm nay </span>
                </h5>
                <div
                  id="trafficChart"
                  ref={trafficChartRef}
                  style={{ minHeight: "400px" }}
                ></div>
              </div>
            </div>

            {/* News & Updates */}
            <div className="card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                  <BiDotsVertical />
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Lọc</h6>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Ngày
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Tháng
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Năm
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body pb-0">
                <h5 className="card-title">
                  Tin tức & Cập nhật <span>| Hôm nay</span>
                </h5>
                <div className="news">
                  <div className="post-item clearfix">
                    <img
                      src="https://greenfuture.tech/_next/image?url=https%3A%2F%2Fupload-static.fgf.vn%2Fcar%2Fvf301.jpg&w=1080&q=75"
                      alt="VinFast VF3"
                    />
                    <h4>
                      <a href="#">
                        VinFast VF3 chính thức ra mắt, giá chỉ từ 200 triệu
                      </a>
                    </h4>
                    <p>
                      VinFast VF3 – mẫu xe điện mini thu hút đông đảo sự quan
                      tâm tại Việt Nam – đã chính thức được công bố giá bán.
                    </p>
                  </div>

                  <div className="post-item clearfix">
                    <img
                      src="https://greenfuture.tech/_next/image?url=https%3A%2F%2Fupload-static.fgf.vn%2Fcar%2Fvf9-eco-09.jpg&w=1080&q=75"
                      alt="VinFast VF 8 City Edition"
                    />
                    <h4>
                      <a href="#">
                        VinFast VF8 mở rộng thị trường sang châu Âu và Mỹ
                      </a>
                    </h4>
                    <p>
                      Mẫu SUV điện VF 8 đã có mặt tại nhiều showroom tại Mỹ và
                      châu Âu, đánh dấu bước tiến lớn của VinFast ra quốc tế.
                    </p>
                  </div>

                  <div className="post-item clearfix">
                    <img
                      src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSVB5gPRQE1jc9Gh5oQ1yDOmfFTxeZKGL35pD7LQvOYKAE10LAvNeNC80YfjYsUAq_wG71KCrj1m-nMTPq3JgFcE4k8M85rpjPkgXCUrkbqBqeXdWlEwbY"
                      alt="VinFast VF9"
                    />
                    <h4>
                      <a href="#">
                        VinFast VF9 nhận giải thiết kế xe điện đẹp nhất châu Á
                      </a>
                    </h4>
                    <p>
                      Mẫu SUV cao cấp VF9 của VinFast đã được vinh danh tại lễ
                      trao giải Asian Auto Design Awards 2024.
                    </p>
                  </div>

                  <div className="post-item clearfix">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGJZ7auMG8MAfjgjIJAj2eIG66VZJEHPVsPA&s"
                      alt="Tesla vs VinFast"
                    />
                    <h4>
                      <a href="#">
                        So sánh VinFast và Tesla: Cuộc cạnh tranh xe điện toàn
                        cầu
                      </a>
                    </h4>
                    <p>
                      VinFast đang trở thành đối thủ đáng gờm của Tesla tại thị
                      trường Đông Nam Á và mở rộng ảnh hưởng toàn cầu.
                    </p>
                  </div>

                  <div className="post-item clearfix">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1c30wozyHwb7uu8sieSu52lsKnSqMtv2n0w&s"
                      alt="VinFast VF6"
                    />
                    <h4>
                      <a href="#">
                        VinFast VF6 - mẫu crossover điện đáng chú ý năm 2025
                      </a>
                    </h4>
                    <p>
                      Với thiết kế hiện đại, pin bền và giá cạnh tranh, VF6 là
                      lựa chọn hấp dẫn trong phân khúc xe điện cỡ nhỏ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;