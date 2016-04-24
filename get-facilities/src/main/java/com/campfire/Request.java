package com.campfire;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;

import java.util.List;

import javax.annotation.Nullable;

import com.google.common.collect.ImmutableList;

public final class Request {
	@Nullable private ImmutableList<Long> facilityIds;
	private boolean validated;

	public void setFacilityIds(List<Long> facilityIds) {
		checkState(!validated);
		checkNotNull(facilityIds);
		this.facilityIds = ImmutableList.copyOf(facilityIds);
	}

	public ImmutableList<Long> getFacilityIds() {
		checkState(validated);
		return facilityIds;
	}

	public void validate() {
		checkState(!validated);
		checkNotNull(facilityIds);
		validated = true;
	}
}