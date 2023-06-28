import React, { PureComponent, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { LineChart, Line } from "recharts";

import { getAllBookAction } from "../../pages/books/BookAction";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { getAllClientAction } from "../user/UserAction";

export const Chart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClientAction());
    dispatch(getAllBookAction());
  }, [dispatch]);

  const { client } = useSelector((state) => state.user);
  const { book } = useSelector((state) => state.books);

  const data = [
    { name: "books", value: book.length },
    { name: "Clients", value: client.length },
  ];

  return (
    <Container className="chart-container">
      <h3 className="text-center text-danger">
        Illustration of total books and Users in library
      </h3>
      <div className="charts">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="green"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </Container>
  );
};
