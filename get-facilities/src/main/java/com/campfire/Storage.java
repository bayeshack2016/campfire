package com.campfire;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.annotation.Nullable;

public final class Storage {
	private static final String DB_HOST = "jdbc:postgresql://campfiredb.cgocqkrwbn6e.us-east-1.rds.amazonaws.com:5432/campfire";
	private static final String DB_USER = "sift";
	private static final String DB_PASSWORD = "stephan2000";
	
	@Nullable private static Storage storage;
	private final Connection connection;

	private Storage() {
		try {
			connection = DriverManager.getConnection(DB_HOST, DB_USER, DB_PASSWORD);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public Facility getFacility(Long facilityId) {
		try {
			return checkedGetFacility(facilityId);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	private Facility checkedGetFacility(Long facilityId) throws SQLException {
		final Facility.Builder facilityBuilder = new Facility.Builder(facilityId);
		final PreparedStatement statement = connection.prepareStatement( "SELECT date, fill FROM fill_normalized WHERE facility_id = ?");
    statement.setLong(1, facilityId);
		final ResultSet resultSet = statement.executeQuery();

		try {
			while (resultSet.next()) {
				facilityBuilder.addEntry(resultSet.getDate(1).toString(), resultSet.getDouble(2));
			}
		} finally {
			resultSet.close();
			statement.close();
		}

    return facilityBuilder.build();
	}

	public static synchronized Storage getInstance() {
		if (storage == null) {
			storage = new Storage();
		}
		return storage;
	}
}
