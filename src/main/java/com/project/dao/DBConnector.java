package com.project.dao;

import java.io.FileReader;
import java.sql.*;
import java.util.Properties;

public class DBConnector {
    private static DBConnector dbConnector = new DBConnector();
    Connection connection = null;

    public static DBConnector getInstance() {return dbConnector; }

    public Connection dbConnect () throws Exception {
        try {
            FileReader resources = new FileReader("C:\\Users\\User\\IdeaProjects\\SurveyProject\\src\\main\\resources\\config\\db.properties");
            Properties properties = new Properties();
            properties.load(resources);

            String dbClass = properties.getProperty("dbClass");
            String database = properties.getProperty("database");
            String user = properties.getProperty("user");
            String password = properties.getProperty("password");

            //System.out.println("database addr : " + database);
            //System.out.println("database : "+dbClass+database+user+password);

            Class.forName(dbClass);
            connection = DriverManager.getConnection(database, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return connection;
    }

    public void closeQuery(ResultSet rs, PreparedStatement pstmt, Connection conn) {
        if (rs != null) {
            try {
                rs.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (pstmt != null) {
            try {
                pstmt.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void closeUpdate(PreparedStatement pstmt, Connection conn) {
        if (pstmt != null) {
            try {
                pstmt.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
