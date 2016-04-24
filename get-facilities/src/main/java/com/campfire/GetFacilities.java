package com.campfire;

import static com.google.common.base.Preconditions.checkNotNull;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.google.common.collect.ImmutableList;

public final class GetFacilities implements RequestHandler<Request, ImmutableList<Facility>> {

	public static final class Response {
		public final ImmutableList<Long> facilityIds;

		public Response(ImmutableList<Long> facilityIds) {
			checkNotNull(facilityIds);
			this.facilityIds = facilityIds;
		}
	}

	@Override
	public ImmutableList<Facility> handleRequest(Request req, Context ctx) {
		checkNotNull(req);
		checkNotNull(ctx);
		req.validate();
		final ImmutableList.Builder<Facility> responseBuilder = ImmutableList.builder();

		for (Long facilityId : req.getFacilityIds()) {
			responseBuilder.add(Storage.getInstance().getFacility(facilityId));
		}

		return responseBuilder.build();
	}

}
