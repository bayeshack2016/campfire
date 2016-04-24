package com.campfire;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;
import com.google.common.collect.ImmutableList;

public final class GetFacilitiesTest {

	private Request buildRequest() {
		final Request request = new Request();
		request.setFacilityIds(ImmutableList.of(70003L));
		return request;
	}
	
	@Test
	public void testGetFacilities() {
		final Context ctx = mock(Context.class);
		final GetFacilities getFacilities = new GetFacilities();
		final ImmutableList<Facility> response = getFacilities.handleRequest(buildRequest(), ctx);
		assertEquals(1, response.size());
		assertEquals(new Long(70003L), response.get(0).facilityId);
	}
}
